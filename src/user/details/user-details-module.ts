import { Module } from "../../framework/module";
import { UserDetailsComponent } from "./user-details-component";
import { UrlParamsService } from "../../shared/url-params-service";
import { UserService } from "../../shared/user-service";
import { UserDataComponent } from "./user-data-component";
import { UserAddressComponent } from "./user-address-component";
import { UserPhoneComponent } from "./user-phone-component";
import { UserDataModalComponent } from "./user-data-modal-component";
import { UserAddressModalComponent } from "./user-address-modal-component";
import { UserPhoneModalComponent } from "./user-phone-modal-component";

export class UserDetailsModule extends Module {
  constructor() {
    super({
      declarations: [
        UserDetailsComponent,
        UserDataComponent,
        UserAddressComponent,
        UserPhoneComponent,
        UserDataModalComponent,
        UserAddressModalComponent,
        UserPhoneModalComponent
      ],
      bootstrap: [
        UserDetailsComponent,
        UserDataComponent,
        UserAddressComponent,
        UserPhoneComponent,
        UserDataModalComponent,
        UserAddressModalComponent,
        UserPhoneModalComponent
      ],
      providers: [UserService, UrlParamsService]
    });
  }
}
