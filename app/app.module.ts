import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import {
  CdAutocompleteComponent,
  CdAutocompleteDirective
} from "./directives/index";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CdAutocompleteComponent,
    CdAutocompleteDirective
  ],
  entryComponents: [CdAutocompleteComponent],
  imports: [ BrowserModule, FormsModule ]
})

export class AppModule { }
