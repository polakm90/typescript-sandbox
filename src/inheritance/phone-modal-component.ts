import { Injectable } from "../framework/ioc";
import { User, UserService } from "../shared/user-service";
import { BaseModalComponent } from "./base-modal-component";

@Injectable()
export class PhoneModalComponent extends BaseModalComponent {
  private phone: HTMLInputElement;
  private error: HTMLElement;

  constructor(private userService: UserService) {
    super({ hidden: false });
  }

  startup(root: HTMLElement): void {
    super.startup(root);
    // nodes
    this.phone = root.querySelector(".js-phone");
    this.error = root.querySelector(".js-phone-error");

    // listeners
    this.phone.addEventListener("change", (event: any) => {
      this.setPhone(event.target.value);
    });
  }

  postStartup(): void {
    super.postStartup();
    this.userService.getRandomUser().then((user: User) => {
      this.setStateValue("phone", user.phone);
    });
  }
  // ------- STATE MANIPULATION -------

  setPhone(value: string): void {
    this.mergeState({ phone: value });
  }

  onOKButtonClick(): void {
    this.disable();
    try {
      this.validatePhone();
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

  private validatePhone() {
    var errors: string[] = [];

    var phone = this.getStateValue("phone");
    if (phone != null && !/^[0-9]+$/.test(phone)) {
      errors.push("invailid-email");
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  // ------------ RENDER ------------
  render(state: any): void {
    super.render(state);

    if (state.errors?.length > 0) {
      this.error.classList.remove("d-none");
    } else {
      this.error.classList.add("d-none");
    }

    this.phone.value = state.phone || "";
  }
}
