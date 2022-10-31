import axios from "axios";
import { Component } from "./framework/component";
import { ConfirmComponent } from "./confirm-component";
import { Injectable } from "./framework/ioc";

@Injectable()
export class LoadExternalComponent extends Component {
  // nodes
  private button: HTMLElement;
  private confirmContainer: HTMLElement;

  // components
  private confirmComponent: ConfirmComponent;

  public constructor() {
    super({
      disabled: false
    });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.confirmContainer = root.querySelector(".js-confirm-container");
    this.button = root.querySelector(".btn");

    // register listeners
    this.button.addEventListener("click", () => this.loadAndInitComponent());
  }

  private loadAndInitComponent() {
    axios
      .get("https://9x6gxr.csb.app/modal.jsx")
      .then((response: any) => {
        var htmlText = response.data.slice(0, -2).replaceAll("\\n", "");
        this.confirmComponent = new ConfirmComponent(
          { hidden: false },
          htmlText,
          this.confirmContainer
        );
        this.confirmComponent.initialize();
      })
      .catch((error) => console.log(error));
  }

  // ----- STATE MANIPULATION SECTION -----

  public disable() {
    this.setStateValue("disabled", true);
  }

  public enable() {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.button.removeAttribute("disabled");
    }

    return;
  }
}
