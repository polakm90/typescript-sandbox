import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { User } from "../../shared/user-service";
import { on } from "../../framework/event";
import { UserPhoneModalComponent } from "./user-phone-modal-component";

@Injectable()
export class UserPhoneComponent extends Component {
  // nodes
  private phone: HTMLElement;
  private editLink: HTMLElement;

  constructor(private userPhoneModalComponent: UserPhoneModalComponent) {
    super({
      initialized: false
    });
  }

  public startup(root: HTMLElement) {
    // nodes
    this.phone = root.querySelector(".js-user-phone");
    this.editLink = root.querySelector(".js-user-phone-edit");

    // event listeners
    this.editLink.addEventListener("click", () => {
      this.userPhoneModalComponent.show();
    });

    // custom event listeners
    on("user-phone-changed", (event: Event) => {
      this.onUserPhoneChanged(event);
    });

    on("user-loaded", (event: any) => {
      this.initState(event.detail);
    });
  }

  private initState(user: User) {
    this.setStateValue("phone.value", user.phone);
    this.setStateValue("initialized", true);
  }

  private onUserPhoneChanged(event: any) {
    this.setStateValue("phone.value", event.detail);
  }

  protected render(state: any): void {
    if (!state.initialized) {
      this.root.classList.add("d-none");
    } else {
      this.root.classList.remove("d-none");
      this.phone.innerHTML = state["phone.value"];
    }
    return;
  }
}
