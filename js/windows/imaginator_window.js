import { Win } from "../Win.js";

export class ImaginatorWindow extends Win {
  constructor(winman, taskman) {
   const projects = [
      {
        title: "Data Structures in C",
        desc: "Fundamental data structures in Computer Science implemented in C.",
        icon: "https://win98icons.alexmeub.com/icons/png/cardfile-1.png",
        link: "https://github.com/Mustafa5040/data_structers"
      },
      {
        title: "FluentShell",
        desc: "Custom shell and terminal interface built with C# and modern styling.",
        icon: "https://win98icons.alexmeub.com/icons/png/console_prompt-0.png",
        link: "https://github.com/Mustafa5040/FluentShell"
      },
      {
        title: "TABU Game",
        desc: "Cross-platform Tabu game built with .NET MAUI and C# supporting Windows and Android.",
        icon: "https://win98icons.alexmeub.com/icons/png/joystick-0.png",
        link: "https://github.com/Mustafa5040/A-Tabu-Game-Written-in-.NET-MAUI"
      },
      {
        title: "Pathfinding Algorithm",
        desc: "Hybrid A* pathfinding algorithm implementation in Python.",
        icon: "https://win98icons.alexmeub.com/icons/png/world-0.png",
        link: "https://github.com/Mustafa5040/autonomous"
      },
      {
        title: "BadAppleLua",
        desc: "Rendering the Bad Apple animation using Lua scripting and Python pipelines.",
        icon: "https://win98icons.alexmeub.com/icons/png/media_player-1.png",
        link: "https://github.com/Mustafa5040/BadAppleLua"
      },
      {
        title: "WinPDF",
        desc: "Lightweight Windows PDF viewer and management utility developed in C#.",
        icon: "https://win98icons.alexmeub.com/icons/png/write_wordpad-1.png",
        link: "https://github.com/Mustafa5040/WinPDF"
      },
      {
        title: "Mehcan-EKilit",
        desc: "Electronic lock control and hardware-software communication project written in C#.",
        icon: "https://win98icons.alexmeub.com/icons/png/key_padlock-0.png",
        link: "https://github.com/Mustafa5040/Mehcan-EKilit"
      },
      {
        title: "PySnake Game",
        desc: "Classic Snake game developed in Python using Pygame and Pygame-menu.",
        icon: "https://win98icons.alexmeub.com/icons/png/game_freecell-2.png",
        link: "https://github.com/Mustafa5040/pysnake-game"
      },
      {
        title: "Robotların Dili Yapay Zeka (TÜBİTAK)",
        desc: "AI and robotics education repository developed in Java.",
        icon: "https://win98icons.alexmeub.com/icons/png/gears_tweakui-0.png",
        link: "https://github.com/Mustafa5040/RobotlarinDiliYapayZekaTBTK"
      },
      {
        title: "Sosyal Forum",
        desc: "Responsive web forum and discussion platform template.",
        icon: "https://win98icons.alexmeub.com/icons/png/msie2-2.png",
        link: "https://github.com/Mustafa5040/sosyal_forum"
      }
    ];

    const projectItemsHtml = projects.map(proj => `
      <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-list-item">
        <img src="${proj.icon}" onerror="this.src='https://win98icons.alexmeub.com/icons/png/executable-0.png'" class="project-icon" />
        <div class="project-info">
          <div class="project-title">${proj.title}</div>
          <div class="project-desc">${proj.desc}</div>
        </div>
      </a>
    `).join("");

    const contentHtml = `
      <menu role="tablist">
        <button aria-selected="true" aria-controls="about">Projects</button>
        <button aria-controls="links">Links</button>
        <button aria-controls="infoAboutMe">Useless Information About</button>
      </menu>

      <article role="tabpanel" id="about" style="display: flex; flex-direction: column; height: 310px; box-sizing: border-box; padding: 4px;">
        <p style="margin: 0 0 8px 0; font-size: 11px; flex-shrink: 0;">
          I am interested in a wide variety of projects ranging from embedded programming to UI development. Click any item to visit its repository:
        </p>
        
        <div class="sunken-panel" style="background: white; flex: 1; min-height: 0; overflow-y: scroll; padding: 4px;">
          <div class="project-list">
            ${projectItemsHtml}
          </div>
        </div>
      </article>

      <article role="tabpanel" hidden id="links">
        <p>Below are the various links to my profile on various platforms.</p>
        <fieldset>
          <legend>Platform</legend>
          <div class="field-row">
            <input id="radio1" type="radio" name="fieldset-example2" value="https://github.com/Mustafa5040" checked>
            <label for="radio1">Github</label>
          </div>
          <div class="field-row">
            <input id="radio2" type="radio" name="fieldset-example2" value="https://discord.com/users/ID">
            <label for="radio2">Discord</label>
          </div>
          <div class="field-row">
            <input id="radio3" type="radio" name="fieldset-example2" value="https://technopat.net">
            <label for="radio3">Technopat</label>
          </div>
          <div class="field-row">
            <input id="radio4" type="radio" name="fieldset-example2" value="https://x.com">
            <label for="radio4">X</label>
          </div>
        </fieldset>
        <section class="field-row" style="margin-top: 8px;">
          <button id="links_go_btn">Go</button>
          <label>Click this to go to the selected platform...</label>
        </section>
      </article>

      <article role="tabpanel" hidden id="infoAboutMe" style="margin: 10px;">
        <img src="./resources/hourglass.gif" width="32" height="32">
        <p>Various info about <code>me</code> which is quite unnecessary</p>
        <p>&bull; My birthday is 4 September 2005</p>
        <p>&bull; My favorite games are <code>Persona 5</code> and <code>Hearts of Iron IV</code></p>
        <p>&bull; I love coffee!</p>
        <section class="field-row" style="justify-content: flex-end; margin-top: 10px;">
          <button id="btn-ok">OK</button>
          <button id="btn-cancel">Cancel</button>
        </section>
      </article>
    `;

    super({
      title: "Imaginator",
      icon: "./resources/user_computer-1.png",
      width: 440,
      height: 420,
      content: contentHtml,
      winman: winman,
      taskman: taskman
    });

    if (this.taskman) {
      this.taskman.pinApp(this);
    }
    this._bindEvents();
  }

  _bindEvents() {
    const goBtn = this.winel.querySelector("#links_go_btn");
    if (goBtn) {
      goBtn.addEventListener("click", () => {
        const selected = this.winel.querySelector('input[name="fieldset-example2"]:checked');
        if (selected && selected.value) {
          window.open(selected.value, "_blank", "noopener,noreferrer");
        }
      });
    }

    const cancelBtn = this.winel.querySelector("#btn-cancel");
    const okBtn = this.winel.querySelector("#btn-ok");
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.close());
    if (okBtn) okBtn.addEventListener("click", () => this.close());
  }
}