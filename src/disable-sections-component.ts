import { Component } from "./framework/component";
import { ExamplePageComponent } from "./example-page-component";
import { Injectable } from "./framework/ioc";

@Injectable()
export class DisableSectionsComponent extends Component {
  // nodes
  private disableButton: HTMLElement;
  private enableButton: HTMLElement;

  public constructor(private examplePageComponent: ExamplePageComponent) {
    super({ disabled: false });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.disableButton = root.querySelector(".js-disable");
    this.enableButton = root.querySelector(".js-enable");

    // register listeners
    this.disableButton.addEventListener("click", () => {
      this.disableSections();
    });
    this.enableButton.addEventListener("click", () => {
      this.enableSections();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  disableSections(): void {
    this.examplePageComponent.disable();
    this.setState({ disabled: true });
  }

  enableSections(): void {
    this.examplePageComponent.enable();
    this.setStateValue("disabled", false);
  }

  protected render(state: any): void {
    if (state.disabled) {
      this.enableButton.classList.remove("d-none");
      this.disableButton.classList.add("d-none");
    } else {
      this.enableButton.classList.add("d-none");
      this.disableButton.classList.remove("d-none");
    }
    return;
  }
}
