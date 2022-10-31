import { Component } from "./framework/component";
import { Injectable } from "./framework/ioc";
import { User, UserService } from "./shared/user-service";

@Injectable()
export class RandomNumberComponent extends Component {
  // nodes
  private button: HTMLElement;
  private number: HTMLElement;

  public constructor(private userService: UserService) {
    super({ number: null });
  }

  protected startup(root: HTMLElement) {
    this.button = root.querySelector(".btn");
    this.number = root.querySelector(".js-random-number");
    this.button.addEventListener("click", () => {
      this.generateRandomNumber();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  // for init initial state async way
  protected postStartup() {
    this.userService.getRandomUser().then((user: User) => {
      this.setCurrentNumber(user.id);
    });
  }

  private generateRandomNumber() {
    var newState = {
      number: Math.ceil(Math.random() * 10)
    };
    this.setState(newState);
  }
  public getCurrentNumber() {
    return this.getStateValue("number");
  }

  public setCurrentNumber(number: number) {
    return this.setStateValue("number", number);
  }

  public disable(): void {
    this.setStateValue("disabled", true);
  }

  public enable(): void {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any) {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.button.removeAttribute("disabled");
    }

    this.number.innerText = state.number;
    return;
  }
}
