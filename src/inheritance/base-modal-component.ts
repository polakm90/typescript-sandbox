import { Component } from "./../framework/component";
import { publish } from "./../framework/event";

export abstract class BaseModalComponent extends Component {
  // nodes
  protected xButton: HTMLElement;
  protected cancelButton: HTMLElement;
  protected okButton: HTMLElement;
  // node collections
  protected inputs: NodeListOf<HTMLInputElement>;

  public constructor(state = { hidden: false }) {
    super(state);
  }

  protected startup(root: HTMLElement): void {
    // register nodes
    this.xButton = root.querySelector(".js-close");
    this.cancelButton = root.querySelector(".js-cancel");
    this.okButton = root.querySelector(".js-ok");
    this.inputs = root.querySelectorAll("input");

    // register listeners
    this.okButton.addEventListener("click", (event) => {
      this.onOKButtonClick(event);
      publish("modal-ok-click", this.getState());
    });
    this.cancelButton.addEventListener("click", (event) => {
      this.onCancelButtonClick(event);
      publish("modal-cacel-click", this.getState());
    });
    this.xButton.addEventListener("click", (event) => {
      this.onXButtonClick(event);
      publish("modal-x-click", this.getState());
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  protected onOKButtonClick(event: Event): void {
    this.hide();
  }

  protected onCancelButtonClick(event: Event): void {
    this.hide();
  }

  protected onXButtonClick(event: Event): void {
    this.hide();
  }

  public show(): void {
    this.setStateValue("hidden", false);
    publish("modal-show", this.getState());
  }

  public hide(): void {
    this.setStateValue("hidden", true);
    publish("modal-hide", this.getState());
  }

  public enable(): void {
    this.setStateValue("disabled", false);
  }

  public disable(): void {
    this.setStateValue("disabled", true);
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    // hidden/show
    if (state.hidden) {
      this.root.classList.add("d-none");
      this.root.classList.remove("d-block");
    } else {
      this.root.classList.add("d-block");
      this.root.classList.remove("d-none");
    }

    // disabled/enabled
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.xButton.setAttribute("disabled", "disabled");
      this.cancelButton.setAttribute("disabled", "disabled");
      this.okButton.setAttribute("disabled", "disabled");
      Array.from(this.inputs).forEach((input: HTMLInputElement) => {
        input.setAttribute("disabled", "disabled");
      });
    } else {
      this.root.classList.remove("text-muted");
      this.xButton.removeAttribute("disabled");
      this.cancelButton.removeAttribute("disabled");
      this.okButton.removeAttribute("disabled");
      Array.from(this.inputs).forEach((input: HTMLInputElement) => {
        input.removeAttribute("disabled");
      });
    }

    return;
  }
}
