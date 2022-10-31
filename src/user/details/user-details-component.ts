import { Component } from "../../framework/component";
import { Injectable } from "../../framework/ioc";
import { UrlParamsService } from "../../shared/url-params-service";
import { UserService } from "../../shared/user-service";
import { on, publish } from "../../framework/event";

@Injectable()
export class UserDetailsComponent extends Component {
  // nodes
  private header: HTMLElement;
  private loading: HTMLElement;

  constructor(
    private urlParamsService: UrlParamsService,
    private userService: UserService
  ) {
    super({
      initialized: false,
      user: null
    });
  }

  protected postStartup(): void {
    var id = this.urlParamsService.getSearchParamValue("id");
    this.userService.loadUser(Number(id)).then((user: any) => {
      publish("user-loaded", user);
    });
  }

  public startup(root: HTMLElement) {
    // nodes
    this.header = root.querySelector(".js-header");
    this.loading = root.querySelector(".js-loading");
    // listeners
    on("user-name-changed", (event: Event) => {
      this.onUserNameChanged(event);
    });
    on("user-loaded", (event: any) => {
      this.setState({ initialized: true, user: event.detail });
    });
  }

  private onUserNameChanged(event: any) {
    let user = this.getStateValue("user");
    user.name = event.detail;
    this.setStateValue("user", user);
  }

  protected render(state: any): void {
    if (!state.initialized) {
      this.loading.classList.remove("d-none");
      this.root.classList.add("d-none");
    } else {
      this.loading.classList.add("d-none");
      this.root.classList.remove("d-none");
      this.header.innerText = state.user.name;
    }
    return;
  }
}
