import { Win } from "../Win.js";

export class ShutdownDialog extends Win {
  constructor(winman, taskman) {
    const contentHtml = `
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <img src="./resources/shutdown_cool.png" width="32" height="32">
        <div style="flex: 1;">
          <fieldset>
            <legend>What would you like the computer to do?</legend>
            <div class="field-row">
              <input id="shutdown_radio" type="radio" name="shutdown-dialog-fieldset"  value="shutdown" checked>
              <label for="shutdown_radio">Shut down</label>
            </div>
            <div class="field-row">
              <input id="restart_radio" type="radio" name="shutdown-dialog-fieldset"  value="restart">
              <label for="restart_radio">Restart</label>
            </div>
          </fieldset>
        </div>
      </div>
      <section class="field-row" style="justify-content: flex-end; margin-top: 12px;">
        <button id="shutdown-btn-ok" style="width: 60px;">OK</button>
        <button id="shutdown-btn-cancel" style="width: 60px;">Cancel</button>
      </section>
    `;

    super({
      title: "Shut Down Imaginator",
      icon: "./resources/shutdown_cool.png",
      width: 320,
      height: 180,
      content: contentHtml,
      winman: winman,
      taskman: taskman,
      hasTaskbarItem: true
    });
    this._bindDialogEvents();

  }

  _bindDialogEvents() {
    const okBtn = this.winel.querySelector("#shutdown-btn-ok");
    const cancelBtn = this.winel.querySelector("#shutdown-btn-cancel");

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.close());
    }

    if (okBtn) {
      okBtn.addEventListener("click", () => {
        const selected = this.winel.querySelector('input[name="shutdown-dialog-fieldset"]:checked');
        if (selected) {
          if (selected.value === "shutdown") {
            document.body.innerHTML = `
              <div style="background: black; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; color: #ff8000; font-family: monospace; font-size: 22px;">
                It's now safe to turn off your computer.
              </div>
            `;
          } else if (selected.value === "restart") {
            window.location.reload();
          }
        }
      });
    }
  }

  close() {
    super.close();
    const desktop = document.getElementById('desktop');
    const mask = document.getElementById("shutdown-mask");
    if (desktop) desktop.classList.remove('win95-desaturate');
    if (mask) {
      mask.classList.remove("active")
    }
  }

}