import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { on, publish } from "../../framework/event";

@Injectable()
export class UserPhoneModalComponent extends Component {
  // nodes
  private userName: HTMLElement;
  private phone: HTMLInputElement;
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
    this.phone = root.querySelector(".js-phone");
    this.xButton = root.querySelector(".js-close");
    this.cancelButton = root.querySelector(".js-cancel");
    this.okButton = root.querySelector(".js-ok");

    // register listeners
    this.phone.addEventListener("change", (event: any) => {
      this.setPhone(event.target.value);
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
      this.setStateValue("userName", event.detail.name);
      this.setStateValue("phone.value", event.detail.phone);
    });

    on("user-name-changed", (event: any) => {
      this.onUserNameChanged(event);
    });
  }
  // ----- STATE MANIPULATION SECTION -----

  private onUserNameChanged(event: any) {
    this.setStateValue("userName", event.detail);
  }

  public setPhone(newPhone: string) {
    this.setStateValue("phone.value", newPhone);
  }

  private submitForm() {
    var phone = this.getStateValue("phone.value");
    publish("user-phone-changed", phone);
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
      this.phone.setAttribute("disabled", "disabled");
      this.okButton.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.phone.removeAttribute("disabled");
      this.okButton.removeAttribute("disabled");
    }

    this.userName.innerText = state["userName"];
    this.phone.value = state["phone.value"];

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
