import { TaskbarManager } from './TaskbarManager.js';
import { WindowManager } from './WindowManager.js';
import { Win } from './Win.js';

window.mainWorker = function() {
  const winman = new WindowManager(document.body);
  const taskbar = document.getElementById("taskbar");
  const taskbar_apps_el = document.getElementById("taskbar-apps")
  
  let taskbar_manager = null;
  if (taskbar && typeof TaskbarManager !== "undefined") {
    taskbar_manager = new TaskbarManager(taskbar, taskbar_apps_el, winman);
  }

  new Win({
    winel: document.getElementById("imaginator_window"),
    winman: winman,
    taskman: taskbar_manager
  });

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

document.addEventListener("DOMContentLoaded", function() {
  window.mainWorker();
});

document.addEventListener('contextmenu', event => event.preventDefault());

const linksBtn = document.getElementById('links_go_btn');

const goBtn = document.getElementById('links_go_btn');
const imaginator_btn = document.getElementById("imaginator_btn")

if (goBtn) {
  goBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="fieldset-example2"]:checked');

    if (selected && selected.value && selected.value.startsWith('http')) {
      window.open(selected.value, '_blank', 'noopener,noreferrer');
    } else {
      alert('Lütfen geçerli bir bağlantıya sahip platform seçin!');
    }
  });
}