import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { UserService } from "../../shared/user-service";

@Injectable()
export class RegisterComponent extends Component {
  // nodes
  private spinner: HTMLElement;
  private successAlert: HTMLElement;
  private warningAlert: HTMLElement;
  private name: HTMLInputElement;
  private nameError: HTMLElement;
  private email: HTMLInputElement;
  private emailError: HTMLElement;
  private website: HTMLInputElement;
  private websiteError: HTMLElement;
  private street: HTMLInputElement;
  private city: HTMLInputElement;
  private postalCode: HTMLInputElement;
  private phone: HTMLInputElement;
  private button: HTMLButtonElement;

  public constructor(private userService: UserService) {
    super({
      initialized: false,
      email: null,
      invalid: null,
      disabled: false
    });
  }

  protected startup(root: HTMLElement) {
    // register nodes
    this.successAlert = root.querySelector(".js-success-alert");
    this.warningAlert = root.querySelector(".js-warning-alert");
    this.spinner = root.querySelector(".js-loading");
    this.name = root.querySelector(".js-name");
    this.nameError = root.querySelector(".js-name-error");
    this.email = root.querySelector(".js-email");
    this.emailError = root.querySelector(".js-email-error");
    this.website = root.querySelector(".js-website");
    this.websiteError = root.querySelector(".js-website-error");
    this.street = root.querySelector(".js-street");
    this.city = root.querySelector(".js-city");
    this.postalCode = root.querySelector(".js-postal-code");
    this.phone = root.querySelector(".js-phone");
    this.button = root.querySelector(".js-register-button");

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
    this.street.addEventListener("change", (event: any) => {
      this.setStreet(event.target.value);
    });
    this.city.addEventListener("change", (event: any) => {
      this.setCity(event.target.value);
    });
    this.postalCode.addEventListener("change", (event: any) => {
      this.setPostalCode(event.target.value);
    });
    this.phone.addEventListener("change", (event: any) => {
      this.setPhone(event.target.value);
    });
    this.button.addEventListener("click", () => {
      this.submit();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  // initialize state from HTML
  protected postStartup() {
    this.setName(this.name.getAttribute("data-default"));
    this.setEmail(this.email.getAttribute("data-default"));
    this.setWebsite(this.website.getAttribute("data-default"));
    this.setStreet(this.street.getAttribute("data-default"));
    this.setCity(this.city.getAttribute("data-default"));
    this.setPostalCode(this.postalCode.getAttribute("data-default"));
    this.setPhone(this.phone.getAttribute("data-default"));
  }

  private setName(value: string) {
    this.setStateValue("name", value);
  }

  private setEmail(value: string) {
    this.setStateValue("email", value);
  }

  private setWebsite(value: string) {
    this.setStateValue("website", value);
  }

  private setStreet(value: string) {
    this.setStateValue("street", value);
  }

  private setCity(value: string) {
    this.setStateValue("city", value);
  }

  private setPostalCode(value: string) {
    this.setStateValue("postalCode", value);
  }

  private setPhone(value: string) {
    this.setStateValue("phone", value);
  }

  private submit() {
    this.clearAlerts();
    this.disable();
    try {
      this.validate();
    } catch (errors) {
      this.setStateValue("errors", errors);
      this.enable();
      return;
    }
    this.userService
      .createUser()
      .then(() => {
        this.success();
        this.enable();
      })
      .catch(() => {
        this.warning();
        this.enable();
      });
  }

  private success() {
    this.setStateValue("success", true);
  }

  private warning() {
    this.setStateValue("warning", true);
  }

  private clearAlerts() {
    this.setStateValue("success", false);
    this.setStateValue("warning", false);
  }

  private validate() {
    var errors = [];
    var name = this.getStateValue("name");
    if (name.indexOf(" ") < 0) {
      errors.push("invalid-name");
    }
    var email = this.getStateValue("email");
    if (email.indexOf("@") < 0) {
      errors.push("invalid-email");
    }
    var website = this.getStateValue("website");
    if (website.indexOf(".") < 0) {
      errors.push("invalid-website");
    }

    if (errors.length > 0) {
      throw errors;
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

  protected render(state: any): void {
    if (state.initialized) {
      this.spinner.classList.remove("d-none");
    } else {
      this.spinner.classList.add("d-none");
    }

    if (state.warning) {
      this.warningAlert.classList.remove("d-none");
    } else {
      this.warningAlert.classList.add("d-none");
    }

    if (state.success) {
      this.successAlert.classList.remove("d-none");
    } else {
      this.successAlert.classList.add("d-none");
    }

    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.email.setAttribute("disabled", "disabled");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.email.removeAttribute("disabled");
      this.button.removeAttribute("disabled");
    }

    this.name.value = state.name || "";
    this.email.value = state.email || "";
    this.website.value = state.website || "";
    this.street.value = state.street || "";
    this.city.value = state.city || "";
    this.postalCode.value = state.postalCode || "";
    this.phone.value = state.phone || "";

    if (state.errors?.indexOf("invalid-name") >= 0) {
      this.nameError.classList.remove("d-none");
    } else {
      this.nameError.classList.add("d-none");
    }

    if (state.errors?.indexOf("invalid-email") >= 0) {
      this.emailError.classList.remove("d-none");
    } else {
      this.emailError.classList.add("d-none");
    }

    if (state.errors?.indexOf("invalid-website") >= 0) {
      this.websiteError.classList.remove("d-none");
    } else {
      this.websiteError.classList.add("d-none");
    }

    return;
  }
}
