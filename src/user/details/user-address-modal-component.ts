import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { on, publish } from "../../framework/event";

@Injectable()
export class UserAddressModalComponent extends Component {
  // nodes
  private userName: HTMLElement;
  private street: HTMLInputElement;
  private city: HTMLInputElement;
  private postalCode: HTMLInputElement;
  private error: HTMLElement;
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
    this.street = root.querySelector(".js-street");
    this.error = root.querySelector(".js-postal-code-error");
    this.city = root.querySelector(".js-city");
    this.postalCode = root.querySelector(".js-postal-code");
    this.xButton = root.querySelector(".js-close");
    this.cancelButton = root.querySelector(".js-cancel");
    this.okButton = root.querySelector(".js-ok");

    // register listeners
    this.street.addEventListener("change", (event: any) => {
      this.setStreet(event.target.value);
    });
    this.city.addEventListener("change", (event: any) => {
      this.setCity(event.target.value);
    });
    this.postalCode.addEventListener("change", (event: any) => {
      this.setPostalCode(event.target.value);
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
      this.setStateValue("street.value", event.detail.address?.street);
      this.setStateValue("city.value", event.detail.address?.city);
      this.setStateValue("postalCode.value", event.detail.address?.zipcode);
    });

    on("user-name-changed", (event: any) => {
      this.onUserNameChanged(event);
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  private onUserNameChanged(event: any) {
    this.setStateValue("userName", event.detail);
  }

  public setStreet(newStreet: string) {
    this.setStateValue("street.value", newStreet);
  }

  public setCity(newCity: string) {
    this.setStateValue("city.value", newCity);
  }

  public setPostalCode(newPostalCode: string) {
    this.setStateValue("postalCode.value", newPostalCode);
  }

  private submitForm() {
    var street = this.getStateValue("street.value");
    var city = this.getStateValue("city.value");
    var postalCode = this.getStateValue("postalCode.value");
    publish("user-street-changed", street);
    publish("user-city-changed", city);
    publish("user-postal-code-changed", postalCode);
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
      this.street.setAttribute("disabled", "disabled");
      this.city.setAttribute("disabled", "disabled");
      this.postalCode.setAttribute("disabled", "disabled");
      this.okButton.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.street.removeAttribute("disabled");
      this.city.removeAttribute("disabled");
      this.postalCode.removeAttribute("disabled");
      this.okButton.removeAttribute("disabled");
    }

    this.userName.innerText = state.userName;
    this.street.value = state["street.value"];
    this.city.value = state["city.value"];
    this.postalCode.value = state["postalCode.value"];

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
