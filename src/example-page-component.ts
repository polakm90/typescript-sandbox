import { Component } from "./framework/component";
import { ChangeColorComponent } from "./change-color-component";
import { RandomNumberComponent } from "./random-number-component";
import { LoadDataComponent } from "./load-data-component";
import { FormValidationComponent } from "./form-validation-component";
import { LoadExternalComponent } from "./load-external-component";
import { OpenModalComponent } from "./open-modal-component";
import { COLORS } from "./shared/colors";
import { Injectable } from "./framework/ioc";

@Injectable()
export class ExamplePageComponent extends Component {
  // prepare state and create components
  public constructor(
    private changeColorComponent: ChangeColorComponent,
    private randomNumberComponent: RandomNumberComponent,
    private loadDataComponent: LoadDataComponent,
    private formValidationComponent: FormValidationComponent,
    private loadExternalComponent: LoadExternalComponent,
    private openModalComponent: OpenModalComponent
  ) {
    super({ color: "primary" });
  }

  // register nodes, register event listeners
  protected startup(root: HTMLElement) {}

  // ----- STATE MANIPULATION SECTION -----

  public changeColor(color: string): string {
    let newColor = color || COLORS[Math.floor(Math.random() * COLORS.length)];

    if (COLORS.indexOf(newColor) >= 0) {
      this.setStateValue("color", newColor);
    }
    return this.getStateValue("color");
  }

  public disable() {
    this.changeColorComponent.disable();
    this.formValidationComponent.disable();
    this.randomNumberComponent.disable();
    this.loadDataComponent.disable();
    this.loadExternalComponent.disable();
    this.openModalComponent.disable();
  }

  public enable() {
    this.changeColorComponent.enable();
    this.formValidationComponent.enable();
    this.randomNumberComponent.enable();
    this.loadDataComponent.enable();
    this.loadExternalComponent.enable();
    this.openModalComponent.enable();
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    this.removeBackgroudColor();
    let color = state.color;
    this.root.classList.add("bg-" + color);
    return;
  }

  private removeBackgroudColor() {
    this.root.classList.add("bg-primary");
    this.root.classList.remove("bg-info");
    this.root.classList.remove("bg-warning");
    this.root.classList.remove("bg-danger");
  }
}
