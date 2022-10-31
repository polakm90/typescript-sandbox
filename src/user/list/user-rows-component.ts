import { Component } from "../../framework/component";
import { UserRowComponent } from "./user-row-component";
import { Injectable } from "../../framework/ioc";
import { User } from "../../shared/user-service";

@Injectable()
export class UserRowsComponent extends Component {
  userRowComponents: UserRowComponent[] = [];

  protected startup(root: any): void {}

  public showUsers(users: User[]): void {
    this.userRowComponents.forEach((component) => {
      component.destroy();
    });
    this.userRowComponents = [];

    var limit = Math.ceil(Math.random() * 10);
    users
      .filter((user) => user.id <= limit)
      .forEach((user: User, index: number) => {
        var userRowComponent = new UserRowComponent({
          user: user,
          number: index + 1
        });
        userRowComponent.initialize();
        this.userRowComponents.push(userRowComponent);
      });
  }

  protected render(state: any): void {
    return;
  }
}
