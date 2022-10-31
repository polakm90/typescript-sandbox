import { drawFromTemplate, Component } from "../../framework/component";

//@Injectable <-- Cannot be incjectable, only for singletons
export class UserRowComponent extends Component {
  // template fo dynamic component
  private template: HTMLElement;

  // nodes
  private userRowNumber: HTMLElement;
  private userName: HTMLElement;
  private userEmail: HTMLElement;

  constructor(state: any) {
    super(state, ".js-user-row-component-" + state.user.id);
  }

  // create root and nodes before startup for dynamic component
  protected preStartup() {
    this.template = document.querySelector(".js-user-row-component-template");
    var user = this.getStateValue("user");
    if (user) {
      drawFromTemplate(
        this.template,
        ".js-user-row-component-" + user.id,
        ["js-user-row-component", "js-user-row-component-" + user.id],
        ["js-user-row-component-template"]
      );
    }
  }

  protected startup(root: HTMLElement): void {
    // nodes
    this.userRowNumber = root.querySelector(".js-user-row-number");
    this.userName = root.querySelector(".js-user-name");
    this.userEmail = root.querySelector(".js-user-email");

    // event listerners
    this.root.addEventListener("click", () => this.openUserDetails());
  }

  openUserDetails() {
    var user = this.getStateValue("user");
    window.document.location = "https://9x6gxr.csb.app/user.html?id=" + user.id;
  }

  setUser(user: any): void {
    this.setStateValue("user", user);
  }

  protected render(state: any): void {
    if (state.user) {
      this.root.classList.remove("d-none");
      this.userRowNumber.innerText = state.number;
      this.userName.innerText = state.user.name;
      this.userEmail.innerText = state.user.email;
    }
  }
}
