import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { on, publish } from "../../framework/event";
@Injectable()
export class UserDataModalComponent extends Component {
  // nodes
  private userName: HTMLElement;
  private name: HTMLInputElement;
  private error: HTMLElement;
  private email: HTMLInputElement;
  private website: HTMLInputElement;
  private xButton: HTMLElement;
  private cancelButton: HTMLElement;
  private okButton: HTMLElement;

  public constructor() {
    super({
      hidden: true,
      email: null,
      invalid: null,
      disabled: false
    });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.userName = root.querySelector(".js-user-name");
    this.name = root.querySelector(".js-name");
    this.error = root.querySelector(".js-name-error");
    this.email = root.querySelector(".js-email");
    this.website = root.querySelector(".js-website");
    this.xButton = root.querySelector(".js-close");
    this.cancelButton = root.querySelector(".js-cancel");
    this.okButton = root.querySelector(".js-ok");

    // register listeners
    this.name.addEventListener("change", (event: any) => {
      this.setName(event.target.value);
    });
    this.email.addEventListener("change", (event: any) => {
      this.setEmail(event.target.value);
    });
    this.website.addEventListener("change", (event: any) => {
      this.setWebsite(event.target.value);
    });
    this.okButton.addEventListener("click", () => {
      this.submitForm();
    });
    this.cancelButton.addEventListener("click", () => {
      this.hide();
    });
    this.xButton.addEventListener("click", () => {
      this.hide();
    });

    // custom events listeners
    on("user-loaded", (event: any) => {
      this.setStateValue("name.value", event.detail.name);
      this.setStateValue("email.value", event.detail.email);
      this.setStateValue("website.value", event.detail.website);
    });
    on("user-name-changed", (event: any) => {
      this.onUserNameChanged(event);
    });
  }
  // ----- STATE MANIPULATION SECTION -----

  private onUserNameChanged(event: any) {
    this.setStateValue("userName", event.detail);
  }

  public setName(newName: string) {
    this.setStateValue("name.value", newName);
  }

  public setEmail(newEmail: string) {
    this.setStateValue("email.value", newEmail);
  }

  public setWebsite(newWebsite: string) {
    this.setStateValue("website.value", newWebsite);
  }

  private submitForm() {
    var email = this.getStateValue("email.value");
    var name = this.getStateValue("name.value");
    var website = this.getStateValue("website.value");
    publish("user-name-changed", name);
    publish("user-email-changed", email);
    publish("user-website-changed", website);
    this.hide();
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
      this.okButton.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.email.removeAttribute("disabled");
      this.okButton.removeAttribute("disabled");
    }

    this.userName.innerText = state.userName;
    this.name.value = state["name.value"];
    this.email.value = state["email.value"];
    this.website.value = state["website.value"];

    if (state.invalid === true) {
      this.error.classList.remove("d-none");
    } else if (state.invalid === false) {
      this.error.classList.add("d-none");
    } else {
      this.error.classList.add("d-none");
    }
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
