import { Component } from "./framework/component";
import { RandomNumberComponent } from "./random-number-component";
import { FormValidationComponent } from "./form-validation-component";
import { FormModalComponent } from "./form-modal-component";
import { Injectable } from "./framework/ioc";
import { User, UserService } from "./shared/user-service";

@Injectable()
export class LoadDataComponent extends Component {
  // nodes
  private userName: any;
  private button: any;

  public constructor(
    private randomNumberComponent: RandomNumberComponent,
    private formValidationComponent: FormValidationComponent,
    private formModalComponent: FormModalComponent,
    private userService: UserService
  ) {
    super({ name: null, disabled: false });
  }

  protected startup(root: HTMLElement) {
    // nodes
    this.userName = root.querySelector(".js-user-name");
    this.button = root.querySelector(".btn");

    // listeners
    this.button.addEventListener("click", () => this.loadUserData());
  }

  // ----- STATE MANIPULATION SECTION -----

  // for initialize state by async way
  protected postStartup() {
    this.userService.getRandomUser().then((user: User) => {
      this.setUserName(user.name);
    });
  }

  private setUserName(userName: string) {
    this.setStateValue("name", userName);
  }

  private loadUserData() {
    var number = this.randomNumberComponent.getCurrentNumber();
    this.userService
      .loadUser(number)
      .then((user: User) => {
        this.setStateValue("name", user?.name);
        this.formValidationComponent.setEmail(user?.email);
        this.formModalComponent.changeWebsite(user?.website);
      })
      .catch((error) => console.log(error));
  }

  public disable() {
    this.setStateValue("disabled", true);
  }

  public enable() {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.button.removeAttribute("disabled", "disabled");
    }

    this.userName.innerText = state.name || "";
    return;
  }
}
