import { Component, drawFromHtmlText } from "./framework/component";
import { Injectable } from "./framework/ioc";

@Injectable()
export class ConfirmComponent extends Component {
  // html
  private readonly htmlText: string;
  private readonly parentNode: HTMLElement;

  // nodes
  private confirmButton: HTMLElement;
  private xButton: HTMLElement;
  private closeButton: HTMLElement;

  constructor(state: any, htmlText: string, parentNode: HTMLElement) {
    super(state);
    this.htmlText = htmlText;
    this.parentNode = parentNode;
  }

  protected preStartup(): void {
    drawFromHtmlText(this.htmlText, ".js-confirm-component", this.parentNode);
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.xButton = root.querySelector(".close");
    this.confirmButton = root.querySelector(".btn");
    this.closeButton = root.querySelector(".btn-secondary");

    // register listeners
    this.xButton.addEventListener("click", () => this.hide());
    this.confirmButton.addEventListener("click", () => this.hide());
    this.closeButton.addEventListener("click", () => this.hide());
  }

  // ----- STATE MANIPULATION SECTION -----

  public show(): void {
    this.setStateValue("hidden", false);
  }

  public hide(): void {
    this.setStateValue("hidden", true);
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    if (state.hidden) {
      this.root.classList.add("d-none");
      this.root.classList.remove("d-block");
    } else {
      this.root.classList.add("d-block");
      this.root.classList.remove("d-none");
    }
    return;
  }
}
