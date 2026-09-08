import { TaskbarManager } from './TaskbarManager.js';
import { WindowManager } from './WindowManager.js';
import { StartMenuManager } from './StartMenuManager.js';
import { Win } from './Win.js';
import { ImaginatorWindow } from './windows/imaginator_window.js';
import { ShutdownDialog } from './windows/shutdown_dlg_window.js';

let taskbar_manager = null;
let startmenu_manager = null;

function isMobileDevice() {
  const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return userAgentCheck
}

function renderMobileWarning() {
  document.body.innerHTML = `
    <div style="width: 100vw; height: 100dvh; display: flex; align-items: center; justify-content: center; background: #008080; padding: 16px; box-sizing: border-box;">
      <div class="window" style="width: 100%; max-width: 380px; box-shadow: 2px 2px 10px rgba(0,0,0,0.5);">
        <div class="title-bar">
          <div class="title-bar-text">Compatibility Issue</div>
          <div class="title-bar-controls">
            <button aria-label="Close" onclick="alert('Please use a desktop browser.')"></button>
          </div>
        </div>
        <div class="window-body" style="padding: 16px;">
          <div style="display: flex; gap: 16px; align-items: center;">
            <img src="./resources/msg_error-0.png" onerror="this.src='https://win98icons.alexmeub.com/icons/png/msg_error-0.png'" style="width: 32px; height: 32px; flex-shrink: 0;" />
            <p style="margin: 0; font-size: 12px; line-height: 1.4;">
              <b>!</b> Mobile devices are not supported.<br><br>
              For the best experience please use this website in your <b>PC</b>
            </p>
          </div>
          <section class="field-row" style="justify-content: flex-end; margin-top: 16px;">
            <button onclick="location.reload()" style="min-width: 70px;">Refresh</button>
          </section>
        </div>
      </div>
    </div>
  `;
}

window.mainWorker = function () {
  if (isMobileDevice()) {
    renderMobileWarning();
    return;
  }

  const winman = new WindowManager(document.body);
  const taskbar = document.getElementById("taskbar");
  const taskbar_apps_el = document.getElementById("taskbar-apps");

  startmenu_manager = new StartMenuManager(winman);

  if (taskbar) {
    taskbar_manager = new TaskbarManager(taskbar, taskbar_apps_el, winman, startmenu_manager);
  }

  const imaginator_window = new ImaginatorWindow(winman, taskbar_manager);

  const shutdown_dialog = new ShutdownDialog(winman, null);
  shutdown_dialog.winel.style.display = "none";

  startmenu_manager.setShutdownDialog(shutdown_dialog);

  new Win({
    title: "testWindow",
    width: 255,
    height: 402,
    winman: winman,
    taskman: taskbar_manager
  });

  new Win({
    title: "MDD",
    width: 250,
    height: 250,
    winman: winman,
    taskman: taskbar_manager
  });
};

document.addEventListener("DOMContentLoaded", function () {
  window.mainWorker();
});

document.addEventListener('contextmenu', event => event.preventDefault());