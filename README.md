# Imaginator

imaginator.vercel.app

My personal portfolio that is an interactive desktop environment mimics windows 98 UI in browser. It has a window named "imaginator" which contains info about my projects, my links and myself. Hosted at vercel.

##  What is this?

An interactive desktop environment written in vanilla javascript using 98.css in web environment. windows management like window moving, maximizing-minimizing; taskbar management like
active window elements, pinned items, clock, start menu etc. all of them written from stratch, no os emulators have used.  My main objective is making an interactive desktop environment instead of a classic about my page
 
## Tech Stack

* **HTML / CSS / Vanilla JavaScript** : Everything is native, no external libraries.
* **[98.css](https://github.com/jdan/98.css)** — Provides windows 98 visual style.

## Key Features

* **Window Manager** — Moving windows, z-index logic, closing/minimizing/maximazing, climping based on window(screen) borders  (`WindowManager.js`, `Win.js`)
* **Taskbar + Start Menu** — Taskbar buttons that show opened windows, pinned apps, real time clock and nested start menu (`TaskbarManager.js`, `StartMenuManager.js`)
* **Imaginator Window** — a tabbed content: list of my project, a radio-button selector forwards to my social medias and a shutdown dialog with non-ACPI animation.
## Running

```bash
npm install
npm start
```
Also can be accesable at [imaginator.vercel.app]
> Note: Mobile devices does not supported. Use PC instead.
