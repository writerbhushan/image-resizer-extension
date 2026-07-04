### Image Optimizer

A lightweight Chrome extension built to simplify image resizing, padding, and cropping workflows for technical documentation teams.

I built this tool independently to eliminate the tedious manual editing steps usually required before uploading screenshots to documentation platforms.

### Features
🚀 Batch process multiple images at once.
📏 Resize images using print dimensions (inches × DPI).
🖼️ Convert images to JPEG, PNG, or WebP with adjustable quality.
📦 Export processed images individually or as a single ZIP archive.
🏷️ Automatically prefixes output filenames with processed_.
💾 Supports silent downloads and automatic overwriting of existing files (when Chrome download settings are configured accordingly).
🔒 All image processing is performed locally in the browser—no files are uploaded to any server.

### Installation

Since this is an unpacked Chrome extension, it must be installed using Chrome's Developer Mode.

1. Download or clone this repository to your computer.
2. If you downloaded the repository as a ZIP file, extract it to a folder.
3. Open Google Chrome and navigate to chrome://extensions/.
4. Enable Developer mode using the toggle in the top-right corner.
5. Click Load unpacked.
6. Browse to the extracted project folder and select the folder containing the manifest.json file.
7. The extension will be installed and its icon will appear in the Chrome toolbar. If it isn't visible, click the Extensions (puzzle) icon and pin the extension for quick access.

**Note**: To enable automatic downloads without a "Save As" prompt for every processed image, open **Chrome Downloads Settings** (chrome://settings/downloads) and **turn off** "**Ask where to save each file before downloading**."

### Why I Built This

I had to waste time jumping back and forth between the browser and image editors just to fix screenshot borders and sizes. And the editors we used could only handle one image at a time. This extension brings those layout controls directly into the browser to speed up my work.

### License

Distributed under the MIT License. Feel free to fork it, use it, or modify it for your own documentation workflows.
