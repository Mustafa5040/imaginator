export class WindowManager {
  constructor(container = document.body) {
    this.container = container;
    this.zIndexCounter = 100;
    this.windows = [];
    this.activeWindow = NaN
  }

  createWindow({ title = "Window", width = 400, height = 400, content = null, id = null }) {
    const winel = document.createElement("div");
    winel.className = "window";
    winel.id = id || `window-${Date.now()}`;
    winel.style.width = width + "px";
    winel.style.height = height + "px";
    winel.style.position = "absolute";
    winel.style.userSelect = "none";

    const tbar = document.createElement("div");
    tbar.className = "title-bar";

    const tbartxt = document.createElement("div");
    tbartxt.className = "title-bar-text";
    tbartxt.innerText = title;

    const tbarcont = document.createElement("div");
    tbarcont.className = "title-bar-controls";

    const minbtn = document.createElement("button");
    minbtn.ariaLabel = "Minimize";
    const maxbtn = document.createElement("button");
    maxbtn.ariaLabel = "Maximize";
    const closebtn = document.createElement("button");
    closebtn.ariaLabel = "Close";

    tbarcont.appendChild(minbtn);
    tbarcont.appendChild(maxbtn);
    tbarcont.appendChild(closebtn);

    tbar.appendChild(tbartxt);
    tbar.appendChild(tbarcont);
    winel.appendChild(tbar);

    const winbody = document.createElement("div");
    winbody.className = "window-body";

    if (!content) {
      const emp = document.createElement("div");
      emp.style.background = "#c0c0c0";
      emp.style.width = "100%";
      emp.style.height = "100%";
      winbody.appendChild(emp);
    } else {
      if (typeof content === "string") {
        winbody.innerHTML = content;
      } else {
        winbody.appendChild(content);
      }
    }
    winel.appendChild(winbody);

    this.container.appendChild(winel);
    return winel;
  }

  registerWindow(wndObj) {
    this.windows.push(wndObj);
  }

 bringToFront(wndEl, wndInstance = null) {
    this.zIndexCounter += 1;
    wndEl.style.zIndex = this.zIndexCounter.toString();

    if (wndInstance) {
        this.activeWindow = wndInstance;
    }
}

  getPageDimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  getWindowDimension(wndEl) {
    return wndEl.getBoundingClientRect();
  }

  moveWindow(wndEl, rawX, rawY) {
    const parent = this.getPageDimensions();
    const winRect = this.getWindowDimension(wndEl);

    const maxX = parent.width - winRect.width;
    const maxY = parent.height - winRect.height;

    const clampedX = Math.max(0, Math.min(rawX, maxX));
    const clampedY = Math.max(0, Math.min(rawY, maxY));

    wndEl.style.left = clampedX + "px";
    wndEl.style.top = clampedY + "px";
  }

  centerWindow(wndEl) {
    const parent = this.getPageDimensions();
    const winRect = this.getWindowDimension(wndEl);

    const x = Math.max(0, (parent.width - winRect.width) / 2);
    const y = Math.max(0, (parent.height - winRect.height) / 2);
    this.moveWindow(wndEl, x, y);
  }
  maximizeWindow(winEl) {
  const pageHeight = this.getPageDimensions().height;
  const pageWidth = this.getPageDimensions().width;

  if (winEl.dataset.isMaximized === "true") {
    winEl.style.left = winEl.dataset.prevLeft;
    winEl.style.top = winEl.dataset.prevTop;
    winEl.style.width = winEl.dataset.prevWidth;
    winEl.style.height = winEl.dataset.prevHeight;
    winEl.dataset.isMaximized = "false";
  } else {
    winEl.dataset.prevLeft = winEl.style.left;
    winEl.dataset.prevTop = winEl.style.top;
    winEl.dataset.prevWidth = winEl.style.width;
    winEl.dataset.prevHeight = winEl.style.height;

    winEl.style.left = "0px";
    winEl.style.top = "0px";
    winEl.style.width = pageWidth + "px";
    winEl.style.height = (pageHeight - 28) + "px";
    winEl.dataset.isMaximized = "true";
  }

  this.bringToFront(winEl);
}
}