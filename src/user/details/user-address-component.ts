import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { User } from "../../shared/user-service";
import { on } from "../../framework/event";
import { UserAddressModalComponent } from "./user-address-modal-component";

@Injectable()
export class UserAddressComponent extends Component {
  // nodes
  private street: HTMLElement;
  private city: HTMLElement;
  private postalCode: HTMLElement;
  private editLink: HTMLElement;

  constructor(private userAddressModalComponent: UserAddressModalComponent) {
    super({
      initialized: false
    });
  }

  public startup(root: HTMLElement) {
    // nodes
    this.street = root.querySelector(".js-user-street");
    this.city = root.querySelector(".js-user-city");
    this.postalCode = root.querySelector(".js-user-postal-code");
    this.editLink = root.querySelector(".js-user-address-edit");
    // event listeners
    this.editLink.addEventListener("click", () => {
      this.userAddressModalComponent.show();
    });
    // custom event listeners
    on("user-name-changed", (event: any) => {
      this.onUserNameChanged(event);
    });

    on("user-loaded", (event: any) => {
      this.initUser(event.detail);
    });

    on("user-street-changed", (event: Event) => {
      this.onUserStreetChanged(event);
    });

    on("user-city-changed", (event: Event) => {
      this.onUserCityChanged(event);
    });

    on("user-postal-code-changed", (event: Event) => {
      this.onUserPostalCodeChanged(event);
    });
  }

  private onUserNameChanged(event: any) {
    this.setStateValue("userName", event.detail);
  }

  private onUserStreetChanged(event: any) {
    this.setStateValue("street.value", event.detail);
  }

  private onUserCityChanged(event: any) {
    this.setStateValue("city.value", event.detail);
  }

  private onUserPostalCodeChanged(event: any) {
    this.setStateValue("postalCode.value", event.detail);
  }

  public initUser(user: User) {
    this.setStateValue("street.value", user.address.street);
    this.setStateValue("city.value", user.address.city);
    this.setStateValue("postalCode.value", user.address.zipcode);
    this.setStateValue("initialized", true);
  }

  protected render(state: any): void {
    if (!state.initialized) {
      this.root.classList.add("d-none");
    } else {
      this.root.classList.remove("d-none");
      this.street.innerText = state["street.value"];
      this.city.innerText = state["city.value"];
      this.postalCode.innerText = state["postalCode.value"];
    }
    return;
  }
}
