import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { UserListComponent } from "./user-list-component";

@Injectable()
export class UsersMainComponent extends Component {
  // nodes
  private successAlert: HTMLElement;

  constructor(private userListComponent: UserListComponent) {
    super({ initialized: true });
  }

  protected startup(root: HTMLElement) {
    this.successAlert = root.querySelector(".js-success-alert");
  }

  protected render(state: any): void {
    if (state.initialized) {
      this.successAlert.classList.remove("d-none");
    } else {
      this.successAlert.classList.add("d-none");
    }

    return;
  }
}
