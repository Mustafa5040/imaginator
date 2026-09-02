export class TaskbarManager {
  constructor(taskbar_el,taskbar_apps_el, winman) {
    this.taskbar_el = taskbar_el;
    this.taskbar_apps_el = taskbar_apps_el
    this.winman = winman;
    this.startbtnel = taskbar_el.querySelector("#startbtn");
    this.appButtons = new Map();
    this.pinnedApps = new Map();
  }

  pinApp(){

  }

  registerPinnedApp(pinEl, wndInstance){
    
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

    btn.addEventListener("click", () => {
      const isHidden = wndInstance.winel.style.display === "none" || wndInstance.winel.style.visibility === "hidden";
      const isTopWindow = this.winman.activeWindow === wndInstance;

      if (isHidden) {
        wndInstance.winel.style.display = "block";
        wndInstance.winel.style.visibility = "visible";
        this.winman.bringToFront(wndInstance.winel);
        this.setActive(wndInstance);
      } else if (isTopWindow) {
        wndInstance.winel.style.display = "none";
        this.removeActive();
      } else {
        this.winman.bringToFront(wndInstance.winel);
        this.setActive(wndInstance);
      }
    });

    this.taskbar_apps_el.appendChild(btn);
    this.appButtons.set(wndInstance, btn);
    this.setActive(wndInstance);
  }

  setActive(wndInstance) {
    this.appButtons.forEach((btn, wnd) => {
      if (wnd === wndInstance) {
        btn.classList.add("active");
        btn.style.boxShadow = "inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080";
        btn.style.background = "#e0e0e0";
        btn.style.fontWeight = "bold";
      } else {
        btn.classList.remove("active");
        btn.style.boxShadow = "";
        btn.style.background = "";
        btn.style.fontWeight = "normal";
      }
    });
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
}