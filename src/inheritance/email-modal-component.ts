import { Injectable } from "../framework/ioc";
import { User, UserService } from "../shared/user-service";
import { BaseModalComponent } from "./base-modal-component";

@Injectable()
export class EmailModalComponent extends BaseModalComponent {
  private email: HTMLInputElement;
  private error: HTMLElement;

  constructor(private userService: UserService) {
    super({ hidden: false });
  }

  startup(root: HTMLElement): void {
    super.startup(root);
    // nodes
    this.email = root.querySelector(".js-email");
    this.error = root.querySelector(".js-email-error");

    // listeners
    this.email.addEventListener("change", (event: any) => {
      this.setEmail(event.target.value);
    });
  }

  postStartup(): void {
    super.postStartup();
    this.userService.getRandomUser().then((user: User) => {
      this.setStateValue("email", user.email);
    });
  }
  // ------- STATE MANIPULATION -------

  setEmail(value: string): void {
    this.setStateValue("email", value);
  }

  onOKButtonClick(): void {
    this.disable();
    try {
      this.validateEmail();
    } catch (errors) {
      this.mergeState({ errors: errors });
      this.enable();
      return;
    }
    // ajax simulation
    setTimeout(() => {
      this.enable();
      this.hide();
    }, 2000);
  }

  private validateEmail() {
    var errors: string[] = [];
    var email = this.getStateValue("email");
    if (email && email?.indexOf("@") === -1) {
      errors.push("invalid-phone");
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  // ------------ RENDER ------------
  render(state: any): void {
    super.render(state);

    if (state.invalid === true) {
      this.error.classList.remove("d-none");
    } else {
      this.error.classList.add("d-none");
    }

    this.email.value = state.email || "";
  }
}
