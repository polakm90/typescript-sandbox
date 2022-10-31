import { Component } from "./framework/component";
import { Injectable } from "./framework/ioc";
import { User, UserService } from "./shared/user-service";

@Injectable()
export class FormModalComponent extends Component {
  private xButton: HTMLElement;
  private website: HTMLInputElement;
  private success: HTMLElement;
  private error: HTMLElement;
  private okButton: HTMLElement;
  private cancelButton: HTMLElement;

  constructor(private userService: UserService) {
    super({
      hidden: true,
      original: null,
      website: null,
      invalid: null
    });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.xButton = root.querySelector(".close");
    this.website = document.querySelector(".js-website");
    this.okButton = root.querySelector(".js-ok");
    this.cancelButton = root.querySelector(".js-cancel");
    this.error = root.querySelector(".js-website-error");
    this.success = root.querySelector(".js-website-success");

    // register listeners
    this.xButton.addEventListener("click", () => this.hide());
    this.okButton.addEventListener("click", () => this.changeWebsite());
    this.cancelButton.addEventListener("click", () => this.hide());
    this.website.addEventListener("change", (event: any) => {
      this.setWebsite(event.target.value);
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  // for initialize state by async way
  protected postStartup(): void {
    this.userService.getRandomUser().then((user: User) => {
      this.changeWebsite(user.website);
    });
  }

  public setWebsite(value: string): void {
    this.setStateValue("website", value);
  }

  public changeWebsite(website: string = null): void {
    website = website || this.getStateValue("website");
    if (website) {
      var invalid = website?.indexOf(".") === -1;
      this.setStateValue("invalid", invalid);
      if (invalid === false) {
        this.setStateValue("original", website);
        this.hide();
      }
    } else {
      this.setStateValue("invalid", null);
    }
  }

  public show(): void {
    this.rewriteStateValue("website", "original");
    this.mergeState({ invalid: null, hidden: false });
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
    this.website.value = state.website || "";

    if (state.invalid === true) {
      this.success.classList.add("d-none");
      this.error.classList.remove("d-none");
    } else if (state.invalid === false) {
      this.error.classList.add("d-none");
      this.success.classList.remove("d-none");
    } else {
      this.error.classList.add("d-none");
      this.success.classList.add("d-none");
    }
    return;
  }
}
