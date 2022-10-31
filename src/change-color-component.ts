import { Component } from "./framework/component";
import { ExamplePageComponent } from "./example-page-component";
import { Injectable, Injector } from "./framework/ioc";
import { UrlParamsService } from "./shared/url-params-service";
import { Node, OnClick } from "./framework/node";
import { On, publish } from "./framework/event";

@Injectable()
export class ChangeColorComponent extends Component {
  // nodes
  @Node(".btn")
  private button: HTMLElement;

  @Node(".js-color")
  private color: HTMLElement;

  // related components
  examplePageComponent: ExamplePageComponent;

  public constructor(private urlParamsService: UrlParamsService) {
    super({ enable: true, color: "primary" });
  }

  public postConstruct(): void {
    this.examplePageComponent = Injector.resolve(ExamplePageComponent);
  }

  protected startup(root: HTMLElement) {
    // register nodes - now by decorator @Node
    // by Node decorator
    // this.button = root.querySelector(".btn");
    // this.color = root.querySelector(".js-color");
    //
    // register listeners - now by decorator @OnClick
    // this.button.addEventListener("click", () => {
    //   this.changeColor();
    // });
  }

  // ----- STATE MANIPULATION SECTION -----

  protected postStartup(): void {
    let color = this.urlParamsService.getSearchParamValue("color");
    this.changeColor(color);
  }

  private changeColor(color: string = null) {
    var currentColor = this.examplePageComponent.changeColor(color);
    publish("color-changed", currentColor);
  }

  public disable(): void {
    this.setState({ disabled: true });
  }

  public enable(): void {
    this.setState({ disabled: false });
  }

  @On("color-changed")
  private onColorChanged(event: any) {
    console.log("On color change: " + event.detail);
    this.setStateValue("color", event.detail);
  }

  @OnClick("button")
  private onButtonClick(event: any) {
    console.log("On button click: ", event.target);
    this.changeColor();
  }
  @OnClick("button")
  private onButtonClick2(event: any) {
    console.log("On button click 2: ", event.target);
  }

  // ------ RENDER SECTION ------

  protected render(state: any): void {
    this.color.innerText = state.color || "";

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
