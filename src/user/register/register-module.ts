import { Module } from "../../framework/module";
import { UserService } from "../../shared/user-service";
import { RegisterComponent } from "./register-component";

export class RegisterModule extends Module {
  constructor() {
    super({
      declarations: [RegisterComponent],
      bootstrap: [RegisterComponent],
      providers: [UserService]
    });
  }
}
