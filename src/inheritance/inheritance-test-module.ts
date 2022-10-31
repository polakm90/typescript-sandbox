import { Module } from "./../framework/module";
import { PhoneModalComponent } from "./phone-modal-component";
import { EmailModalComponent } from "./email-modal-component";
import { UserService } from "../shared/user-service";

export class InheritanceTestModule extends Module {
  constructor() {
    super({
      declarations: [PhoneModalComponent, EmailModalComponent],
      bootstrap: [PhoneModalComponent, EmailModalComponent],
      providers: [UserService]
    });
  }
}
