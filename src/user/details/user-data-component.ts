import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { User } from "../../shared/user-service";
import { on } from "../../framework/event";
import { UserDataModalComponent } from "./user-data-modal-component";

@Injectable()
export class UserDataComponent extends Component {
  // nodes
  private name: HTMLElement;
  private email: HTMLElement;
  private website: HTMLElement;
  private editLink: HTMLElement;

  constructor(private userDataModalComponent: UserDataModalComponent) {
    super({
      initialized: false,
      user: null
    });
  }

  public startup(root: HTMLElement) {
    // nodes
    this.name = root.querySelector(".js-user-name");
    this.email = root.querySelector(".js-user-email");
    this.website = root.querySelector(".js-user-website");
    this.editLink = root.querySelector(".js-user-data-edit");
    // event listeners
    this.editLink.addEventListener("click", () => {
      this.userDataModalComponent.show();
    });

    //custom event listenrs
    on("user-name-changed", (event: Event) => {
      this.onUserNameChanged(event);
    });

    on("user-email-changed", (event: Event) => {
      this.onUseEmailChanged(event);
    });

    on("user-website-changed", (event: Event) => {
      this.onUserWebsiteChanged(event);
    });

    on("user-loaded", (event: any) => {
      this.initUser(event.detail);
    });
  }

  private initUser(user: User) {
    this.setStateValue("user", user);
    this.setStateValue("initialized", true);
  }

  private onUserNameChanged(event: any) {
    let user = this.getStateValue("user");
    user.name = event.detail;
    this.setStateValue("user", user);
  }

  private onUseEmailChanged(event: any) {
    let user = this.getStateValue("user");
    user.email = event.detail;
    this.setStateValue("user", user);
  }

  private onUserWebsiteChanged(event: any) {
    let user = this.getStateValue("user");
    user.website = event.detail;
    this.setStateValue("user", user);
  }

  protected render(state: any): void {
    if (!state.initialized) {
      this.root.classList.add("d-none");
    } else {
      this.root.classList.remove("d-none");
      this.name.innerText = state.user?.name;
      this.email.innerText = state.user?.email;
      this.website.innerText = state.user?.website;
    }
    return;
  }
}
