import { TaskbarManager } from './TaskbarManager.js';
import { WindowManager } from './WindowManager.js';
import { StartMenuManager } from './StartMenuManager.js';
import { Win } from './Win.js';
import { ImaginatorWindow } from './windows/imaginator_window.js';
import { ShutdownDialog } from './windows/shutdown_dlg_window.js';

let taskbar_manager = null;
let startmenu_manager = null;

window.mainWorker = function () {
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