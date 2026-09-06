export class StartMenuManager {
  constructor(winman, shutdownDialog = null) {
    this.menuEl = document.getElementById("start-menu");
    this.winman = winman;
    this.isOpen = false;
    this.shutdownDialog = shutdownDialog;
    this.onToggle = null;

    this._initEvents();
  }

  setShutdownDialog(dialog) {
    this.shutdownDialog = dialog;
  }

  _notify() {
    if (typeof this.onToggle === "function") {
      this.onToggle(this.isOpen);
    }
  }

  open() {
    this.menuEl.style.display = "block";
    this.isOpen = true;
    this._notify();
  }

  close() {
    if (!this.isOpen) return;
    this.menuEl.style.display = "none";
    this.isOpen = false;
    this._notify();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  _initEvents() {
    this.menuEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const items = this.menuEl.querySelectorAll('li[role="menuitem"]');
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const action = item.dataset.action;
        this.handleAction(action);
        this.close();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    document.addEventListener("click", () => {
      if (this.isOpen) {
        this.close();
      }
    });
  }

  handleAction(action) {
    switch (action) {
      case "shutdown-button-action":
        this.triggerShutdown();
        break;
    }
  }

  triggerShutdown() {
    if (this.shutdownDialog) {
      this.shutdownDialog.open();
      const desktop = document.getElementById('desktop');
      const mask = document.getElementById("shutdown-mask");
      if (desktop) desktop.classList.add('win95-desaturate');
      if (mask) {
        mask.classList.add("active")
        mask.style.zIndex = this.winman.zIndexCounter - 1;
      }
    }
  }
}