import { Win } from "../Win.js";


export class ImaginatorWindow extends Win {

    constructor(winman, taskman) {
        const contentHtml = `
  <menu role="tablist">
    <button aria-selected="true" aria-controls="about">Projects</button>
    <button aria-controls="links">links</button>
    <button aria-controls="infoAboutMe">Useless Information About</button>
  </menu>

  <article role="tabpanel" id="about">
   <p> I have a lot of variaty type of projects that i am interested. From embeded programming to UI programming and unmanned vehicles. I can't finish everything of course. But the below are the compeleted or close to complete projects. </p>
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
            <input id="radio3" type="radio" name="fieldset-example2"  value="https://technopat.net">
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
            width: 420,
            height: 420,
            content: contentHtml,
            winman: winman,
            taskman: taskman
        });
        this.taskman.pinApp(this)
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
    }


}