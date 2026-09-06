import { TaskbarManager } from './TaskbarManager.js';
import { WindowManager } from './WindowManager.js';
import { Win } from './Win.js';
import { ImaginatorWindow } from './windows/imaginator_window.js';

let taskbar_manager = null;

window.mainWorker = function () {
  const winman = new WindowManager(document.body);
  const taskbar = document.getElementById("taskbar");
  const taskbar_apps_el = document.getElementById("taskbar-apps");

  if (taskbar && typeof TaskbarManager !== "undefined") {
    taskbar_manager = new TaskbarManager(taskbar, taskbar_apps_el, winman);
  }

  const imaginator_window = new ImaginatorWindow(winman, taskbar_manager);

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
document.addEventListener('click', event => {
  const isClickInsideStartBtn = event.target.closest('#startbtn');
  const isClickInsideStartMenu = event.target.closest('#start-menu');

  if (!isClickInsideStartBtn && !isClickInsideStartMenu) {
    const startmenu = document.getElementById("start-menu");
    if (startmenu) {
      startmenu.style.display = "none";
      // Eğer visibility kullanıyorsanız:
      startmenu.style.visibility = "hidden";
      
      if (typeof taskbar_manager !== "undefined" && taskbar_manager) {
        taskbar_manager.isMenuOpen = false;
      }
    }
  }
});