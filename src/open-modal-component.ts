import { Component } from "./framework/component";
import { FormModalComponent } from "./form-modal-component";
import { Injectable } from "./framework/ioc";

@Injectable()
export class OpenModalComponent extends Component {
  // nodes
  private button: HTMLElement;

  // related components

  public constructor(private formModalComponent: FormModalComponent) {
    super({ enable: true });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.button = root.querySelector(".btn");

    // register listeners
    this.button.addEventListener("click", () => {
      this.formModalComponent.show();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  public disable(): void {
    this.setState({ disabled: true });
  }

  public enable(): void {
    this.setState({ disabled: false });
  }

  // ------ RENDER SECTION ------

  protected render(state: any): void {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.button.removeAttribute("disabled", "disabled");
    }
    return;
  }
}
