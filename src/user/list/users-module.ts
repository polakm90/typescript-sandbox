import { Module } from "../../framework/module";
import { UserListComponent } from "./user-list-component";
import { UsersMainComponent } from "./users-main-component";
import { UserService } from "../../shared/user-service";
import { UserRowsComponent } from "./user-rows-component";

export class UsersModule extends Module {
  constructor() {
    super({
      declarations: [UsersMainComponent, UserListComponent, UserRowsComponent],
      bootstrap: [UsersMainComponent, UserListComponent, UserRowsComponent],
      providers: [UserService]
    });
  }
}
