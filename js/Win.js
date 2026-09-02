export class Win {
  constructor({
    winel = null,
    title = "Untitled Window",
    content = null,
    width = 400,
    height = 400,
    icon = null,
    id = null,
    winman,
    taskman = null
  }) {
    this.winman = winman;
    this.taskman = taskman;
    this.icon = icon;

    this.winel = winel ? winel : this.winman.createWindow({ title, width, height, content, id });

    this.titlebar = this.winel.querySelector(".title-bar");
    this.titleText = this.winel.querySelector(".title-bar-text");
    this.content = this.winel.querySelector(".window-body");
    this.tbarControls = this.winel.querySelector(".title-bar-controls");
    this.closeBtn = this.tbarControls ? this.tbarControls.querySelector('button[aria-label="Close"], #close-btn') : null;
    this.maxBtn = this.tbarControls ? this.tbarControls.querySelector('button[aria-label="Maximize"], #maximize-btn') : null;
    this.minBtn = this.tbarControls ? this.tbarControls.querySelector('button[aria-label="Minimize"], #minimize-btn') : null;

    this.moveCanvas = document.createElement("canvas");
    this.moveCanvas.width = window.innerWidth;
    this.moveCanvas.height = window.innerHeight;
    this.moveCanvas.style.position = "fixed";
    this.moveCanvas.style.left = "0";
    this.moveCanvas.style.top = "0";
    this.moveCanvas.style.zIndex = "99999";
    this.moveCanvas.style.pointerEvents = "none";
    this.moveCanvas.style.mixBlendMode = "difference";
    this.moveCanvas.style.display = "none";
    document.body.appendChild(this.moveCanvas);
    this.ctx = this.moveCanvas.getContext("2d");

    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.newLeft = 0;
    this.newTop = 0;

    this._init();
  }

  _init() {
    this.winman.registerWindow(this);
    this.winman.centerWindow(this.winel);
    this.winman.bringToFront(this.winel, this);

    window.addEventListener("resize", () => {
      this.moveCanvas.width = window.innerWidth;
      this.moveCanvas.height = window.innerHeight;
    });

    if (this.titlebar) {
      this.titlebar.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    }

    this.winel.addEventListener("mousedown", () => {
      this.winman.bringToFront(this.winel, this);
    });

    document.addEventListener("mouseup", (e) => this.handleMouseUp(e));
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => {
        this.winel.style.display = "none";
      });
    }
    if (this.taskman) {
      this.taskman.addWindow(this);
    }

    this.winel.addEventListener("mousedown", () => {
      this.winman.bringToFront(this.winel, this);
      if (this.taskman) {
        this.taskman.setActive(this);
      }
    });

    if(this.maxBtn){
      this.maxBtn.addEventListener("click",() => {
        this.winman.maximizeWindow(this.winel);
        if(this.taskman){
          this.taskman.setActive(this)
        }
      })
    }
    if (this.minBtn) {
      this.minBtn.addEventListener("click", () => {
        this.winel.style.display = "none";
        if (this.taskman) {
          this.taskman.removeActive();
        }
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => {
        this.winel.style.display = "none";
        if (this.taskman) {
          this.taskman.removeWindow(this);
        }
      });
    }
    this._initTabs();
  }

  _initTabs() {
    const tabs = this.winel.querySelectorAll('menu[role="tablist"] button');
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.removeAttribute("aria-selected"));
        this.winel.querySelectorAll('article[role="tabpanel"]').forEach(p => p.hidden = true);

        tab.setAttribute("aria-selected", "true");
        const panelId = tab.getAttribute("aria-controls");
        const targetPanel = this.winel.querySelector(`#${panelId}`);
        if (targetPanel) targetPanel.hidden = false;
      });
    });
  }

  handleMouseDown(e) {
    if (e.target.closest("button")) return;
    if (e.button === 0) {
      this.isDragging = true;
      document.body.style.userSelect = "none";
      this.offsetX = e.clientX - this.winel.offsetLeft;
      this.offsetY = e.clientY - this.winel.offsetTop;

      this.newLeft = this.winel.offsetLeft;
      this.newTop = this.winel.offsetTop;

      this.moveCanvas.style.display = "block";
      this.drawDashedRect(this.ctx, this.newLeft, this.newTop, this.winel.offsetWidth, this.winel.offsetHeight);
    }
  }

  handleMouseMove(e) {
    if (!this.isDragging) return;

    const parent = this.winman.getPageDimensions();
    const winRect = this.winman.getWindowDimension(this.winel);

    this.newLeft = e.clientX - this.offsetX;
    this.newLeft = Math.max(0, Math.min(this.newLeft, parent.width - winRect.width));

    this.newTop = e.clientY - this.offsetY;
    this.newTop = Math.max(0, Math.min(this.newTop, parent.height - winRect.height));

    this.drawDashedRect(this.ctx, this.newLeft, this.newTop, winRect.width, winRect.height);
  }

  handleMouseUp(e) {
    if (this.isDragging) {
      this.isDragging = false;
      this.moveCanvas.style.display = "none";
      this.ctx.clearRect(0, 0, this.moveCanvas.width, this.moveCanvas.height);
      document.body.style.userSelect = "";
      this.winman.moveWindow(this.winel, this.newLeft, this.newTop);
    }
  }

  drawDashedRect(ctx, x, y, w, h) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x, y, w, h);
  }
}