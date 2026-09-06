export class TaskbarManager {
  constructor(taskbar_el, taskbar_apps_el, winman, startMenuManager) {
    this.taskbar_el = taskbar_el;
    this.taskbar_apps_el = taskbar_apps_el;
    this.winman = winman;
    this.startman = startMenuManager;
    this.pin_app_container_el = taskbar_el.querySelector("#taskbar-pinned-apps");
    this.startbtnel = taskbar_el.querySelector("#startbtn");
    this.appButtons_el = taskbar_el.querySelector("#taskbar-apps");
    this.appButtons = new Map();
    this.pinnedApps = new Map();
    this._initClock();
    this._initStartButton()
  }

  _initStartButton() {
    if (!this.startbtnel || !this.startman) return;
    this.startman.onToggle = (isOpen) => {
      if (isOpen) {
        this.makeButtonActive(this.startbtnel);
      } else {
        this.makeButtonPassive(this.startbtnel);
      }
    };

    this.startbtnel.addEventListener("click", (e) => {
      e.stopPropagation();
      this.startman.toggle();
    });
  }

  updateStartButtonState() {
    if (this.startman && this.startman.isOpen) {
      this.makeButtonActive(this.startbtnel);
    } else {
      this.makeButtonPassive(this.startbtnel);
    }
  }
  pinApp(wndInstance) {
    if (wndInstance.icon) {
      const ic_bt = document.createElement("img");
      ic_bt.className = "tb-pinned-item";
      ic_bt.src = wndInstance.icon;
      ic_bt.style.width = "24px";
      ic_bt.style.height = "24px";
      ic_bt.style.verticalAlign = "middle";
      this.pinnedApps.set(wndInstance, ic_bt);
      this.pin_app_container_el.append(ic_bt)
      ic_bt.addEventListener("click", () => {
        this.handlePinnedAppItemClick(wndInstance)
      });
    }
  }

  registerPinnedApp(pinEl, wndInstance) {
    this.pinnedApps.set(wndInstance, pinEl);

    pinEl.addEventListener("click", () => {
      this.handlePinnedAppItemClick(wndInstance)
    });
  }

  handlePinnedAppItemClick(wndInstance) {
    const displayStyle = wndInstance.winel.style.display;
    const is_hidden = displayStyle === "none" ||
      wndInstance.winel.style.visibility === "hidden" ||
      displayStyle === "";

    const is_topmost = this.winman.activeWindow === wndInstance;

    if (is_hidden) {
      wndInstance.winel.style.display = "block";
      wndInstance.winel.style.visibility = "visible";
      this.winman.bringToFront(wndInstance.winel, wndInstance);
      const btn = this.appButtons.get(wndInstance)
      if (!btn) {
        this.addWindow(wndInstance)
      }
      this.setActive(wndInstance);
    } else if (is_topmost) {
      wndInstance.winel.style.display = "none";
      this.removeActive();
    } else {
      this.winman.bringToFront(wndInstance.winel, wndInstance);
      this.setActive(wndInstance);
    }
  }
  handleTaskbarWindowsItemClick(wndInstance) {
    const isHidden = wndInstance.winel.style.display === "none" || wndInstance.winel.style.visibility === "hidden";
    const isTopWindow = this.winman.activeWindow === wndInstance;

    if (isHidden) {
      wndInstance.winel.style.display = "block";
      wndInstance.winel.style.visibility = "visible";
      this.winman.bringToFront(wndInstance.winel, wndInstance);
      this.setActive(wndInstance);
    } else if (isTopWindow) {
      wndInstance.winel.style.display = "none";
      this.removeActive();
      this.winman.setActiveWindow(this.winman.windows.at(-1))
      this.setActive(this.winman.windows.at(-1))
    } else {
      this.winman.bringToFront(wndInstance.winel, wndInstance);
      this.winman.activeWindow = wndInstance
      this.setActive(wndInstance);
    }
  }
  addWindow(wndInstance) {
    const btn = document.createElement("button");
    btn.className = "taskbar-item";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.gap = "4px";
    btn.style.height = "22px";
    btn.style.maxWidth = "160px";
    btn.style.overflow = "hidden";
    btn.style.textOverflow = "ellipsis";
    btn.style.whiteSpace = "nowrap";

    const title = wndInstance.titleText ? wndInstance.titleText.innerText : "Window";
    btn.innerHTML = `
      <img src="${wndInstance.icon}" style="width: 16px; height: 16px; pointer-events: none;" />
      <span style="font-size: 11px; pointer-events: none;">${title}</span>
    `;

    this.taskbar_apps_el.appendChild(btn);
    this.appButtons.set(wndInstance, btn);
    this.setActive(wndInstance);

    btn.addEventListener("click", () => {
      this.handleTaskbarWindowsItemClick(wndInstance)
    });
  }

  setActive(wndInstance) {
    this.appButtons.forEach((btn, wnd) => {
      if (wnd === wndInstance) {
        this.makeButtonActive(btn);
      } else {
        this.makeButtonPassive(btn);
      }
    });
  }

  makeButtonActive(btnEl) {
    btnEl.classList.add("active");
    btnEl.style.boxShadow = "inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080";
    btnEl.style.background = "#e0e0e0";
    btnEl.style.fontWeight = "bold";
  }
  makeButtonPassive(btnEl) {
    btnEl.classList.remove("active");
    btnEl.style.boxShadow = "";
    btnEl.style.background = "";
    btnEl.style.fontWeight = "normal";
  }

  removeActive() {
    this.appButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.style.boxShadow = "";
      btn.style.background = "";
      btn.style.fontWeight = "normal";
    });
  }

  removeWindow(wndInstance) {
    const btn = this.appButtons.get(wndInstance);
    if (btn) {
      btn.remove();
      this.appButtons.delete(wndInstance);
    }
  }

  _initClock() {
    const clockEl = this.taskbar_el ? this.taskbar_el.querySelector("#clock_tray") : document.getElementById("clock_tray");

    if (!clockEl) {
      console.error("clock_tray not found!");
      return;
    }

    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      clockEl.textContent = `${hours}:${minutes}`;
    };

    update();
    setInterval(update, 1000);
  }


}
