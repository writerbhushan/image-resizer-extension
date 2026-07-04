const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");

const widthIn = document.getElementById("widthIn");
const heightIn = document.getElementById("heightIn");
const dpi = document.getElementById("dpi");
const keepAR = document.getElementById("keepAR");
const dpiOnly = document.getElementById("dpiOnly");

const format = document.getElementById("format");
const quality = document.getElementById("quality");

const zipAll = document.getElementById("zipAll");
const zipName = document.getElementById("zipName");

const openDownloadsSettings = document.getElementById("openDownloadsSettings");

openDownloadsSettings.onclick = () => {
  chrome.tabs.create({ url: "chrome://settings/downloads" });
};

let files = [];

fileInput.onchange = () => {
  files = Array.from(fileInput.files);
};

clearBtn.onclick = () => {
  files = [];
  fileInput.value = "";
};

processBtn.onclick = async () => {
  if (!files.length) return alert("Select images");

  const dpiVal = parseInt(dpi.value);
  const wIn = parseFloat(widthIn.value);
  const hIn = parseFloat(heightIn.value);

  if (!dpiOnly.checked) {
    if (!dpiVal) return alert("Enter DPI");
    if (!wIn && !hIn) return alert("Enter width or height");
  }

  let zipData = {};

  for (let file of files) {
    const img = await loadImage(file);

    let w = img.width;
    let h = img.height;

    if (!dpiOnly.checked) {
      const ar = w / h;

      if (keepAR.checked) {
        if (wIn) {
          w = wIn * dpiVal;
          h = w / ar;
        } else {
          h = hIn * dpiVal;
          w = h * ar;
        }
      } else {
        w = wIn * dpiVal;
        h = hIn * dpiVal;
      }
    }

    const blob = await resize(img, w, h);

    const name = "processed_" + file.name;

    if (zipAll.checked) {
      const buf = await blob.arrayBuffer();
      zipData[name] = new Uint8Array(buf);
    } else {
      download(blob, name);
    }
  }

  if (zipAll.checked) {
    const zipped = fflate.zipSync(zipData);
    download(new Blob([zipped]), zipName.value);
  }

  status.textContent = "Done";
};

function loadImage(file) {
  return new Promise(res => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => res(img);
  });
}

function resize(img, w, h) {
  return new Promise(res => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);

    canvas.toBlob(res, format.value, parseFloat(quality.value));
  });
}

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url,
    filename: name,
    saveAs: false,
    conflictAction: "overwrite"
  });
}