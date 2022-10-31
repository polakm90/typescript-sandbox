import { Component } from "./framework/component";
import { Injectable } from "./framework/ioc";
import { OnChange, OnClick } from "./framework/node";
import { UserService, User } from "./shared/user-service";

@Injectable()
export class FormValidationComponent extends Component {
  // nodes
  private email: HTMLInputElement;
  private error: HTMLElement;
  private success: HTMLElement;
  private button: HTMLElement;

  public constructor(private userService: UserService) {
    super({
      email: null,
      invalid: null,
      disabled: false
    });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.button = root.querySelector(".btn");
    this.email = root.querySelector(".js-email");
    this.error = root.querySelector(".js-email-error");
    this.success = root.querySelector(".js-email-success");

    // register listeners - now realized by @OnChange
    // this.email.addEventListener("change", (event: any) => {
    //   this.setEmail(event.target.value);
    // });
  }

  // ----- STATE MANIPULATION SECTION -----

  // for initialize state by async way
  protected postStartup() {
    this.userService.getRandomUser().then((user: User) => {
      this.setEmail(user.email);
    });
  }

  @OnChange("email")
  private onChangeEmailInput(event: any) {
    console.log("On change email input value");
    this.setEmail(event.target.value);
  }

  @OnClick("button")
  private onButtonClick() {
    this.validateEmail();
  }

  public setEmail(newEmail: string) {
    this.mergeState({ email: newEmail, invalid: null });
  }

  private validateEmail() {
    var email = this.getStateValue("email");
    if (email) {
      var invalid = email?.indexOf("@") === -1;
      this.setStateValue("invalid", invalid);
    } else {
      this.setStateValue("invalid", null);
    }
  }

  public show(): any {
    this.setStateValue("hidden", false);
  }

  public hide() {
    this.setStateValue("hidden", true);
  }

  public disable() {
    this.setStateValue("disabled", true);
  }

  public enable() {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any) {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.email.setAttribute("disabled", "disabled");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.email.removeAttribute("disabled");
      this.button.removeAttribute("disabled");
    }

    this.email.value = state.email || "";
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
