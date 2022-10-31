import { Module } from "./framework/module";
import { ExamplePageComponent } from "./example-page-component";
import { ConfirmComponent } from "./confirm-component";
import { FormModalComponent } from "./form-modal-component";
import { FormValidationComponent } from "./form-validation-component";
import { LoadDataComponent } from "./load-data-component";
import { LoadExternalComponent } from "./load-external-component";
import { OpenModalComponent } from "./open-modal-component";
import { RandomNumberComponent } from "./random-number-component";
import { ChangeColorComponent } from "./change-color-component";
import { DisableSectionsComponent } from "./disable-sections-component";
import { UserService } from "./shared/user-service";

export class ExampleModule extends Module {
  constructor() {
    super({
      declarations: [
        ExamplePageComponent,
        ChangeColorComponent,
        FormModalComponent,
        FormValidationComponent,
        LoadDataComponent,
        LoadExternalComponent,
        OpenModalComponent,
        RandomNumberComponent,
        DisableSectionsComponent
      ],
      bootstrap: [
        ExamplePageComponent,
        ChangeColorComponent,
        FormModalComponent,
        FormValidationComponent,
        LoadDataComponent,
        LoadExternalComponent,
        OpenModalComponent,
        RandomNumberComponent,
        DisableSectionsComponent
      ],
      providers: [UserService]
    });
  }
}
