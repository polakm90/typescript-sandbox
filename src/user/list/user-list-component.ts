import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { UserService } from "../../shared/user-service";
import { UserRowsComponent } from "./user-rows-component";

@Injectable()
export class UserListComponent extends Component {
  // nodes
  private successAlert: HTMLElement;
  private loadUsersButton: HTMLElement;

  constructor(
    private userRowsComponent: UserRowsComponent,
    private userService: UserService
  ) {
    super({
      initialized: true
    });
  }

  public startup(root: HTMLElement) {
    // nodes
    this.successAlert = root.querySelector(".js-success-alert");
    this.loadUsersButton = root.querySelector(".js-load-users-button");
    // listeners
    this.loadUsersButton.addEventListener("click", () => this.reloadUsers());
  }

  public reloadUsers() {
    this.userService.loadUsers().then((users: any) => {
      this.userRowsComponent.showUsers(users);
    });
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
