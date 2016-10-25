import { Component } from "@angular/core";
import {
  CdAutocompleteData,
  CdAutocomplete,
  CdAutocompleteResponse
} from "./directives/cd-autocomplete/index";

@Component({
  selector: "my-app",
  template: `
    <h1>Angular 2 autocomplete</h1>
    <p>Example of simple autocomplete functionality implemented in Angular 2</p>
    <h2>Input autocomplete</h2>
    <p>Please try to type in the input below one of the country from this list:
      <span *ngFor="let item of countries; let i = index">
        <template [ngIf]="i > 0">, </template>
        {{item}}
      </span>
    </p>
    <div>
      <input
        [(ngModel)]="inputValue"
        [cdAutocomplete]="inputAutocomplete"
        (cdAutocompleteUpdate)="updateInputAutocomplete($event)"
        type="text"
        placeholder="Country"/>
    <div>
    <h2>Textarea autocomplete</h2>
    <p>You can invoke autocomplete in the textarea below by typing # (for tags) or @ (for names)</p>
    <div>
      <textarea
        [(ngModel)]="textareaValue"
        [cdAutocomplete]="textareaAutocomplete"
        (cdAutocompleteUpdate)="updateTextareaAutocomplete($event)"
        rows="4" placeholder="Type post...">
      </textarea>
    </div>
  `
})
export class AppComponent {
  countries: string[] = [
    "Australia",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Japan",
    "Poland",
    "Russia",
    "Switzerland",
    "United Kingdom",
    "United States"
  ];
  inputValue: string = "";
  inputAutocomplete: CdAutocomplete = {
    changeTrigger: false,
    list: []
  };
  tags: string[] = [
    "tag",
    "test",
    "angular",
    "autocomplete"
  ];
  textareaAutocomplete: CdAutocomplete = {
    changeTrigger: false,
    data: [
      new CdAutocompleteData([], "#"),
      new CdAutocompleteData([], "@")
    ]
  };
  textareaValue: string = "";
  users: string[] = [
    "Albert Einstein",
    "Isaac Newton",
    "Leonardo Da Vinci",
    "Nikola Tesla",
    "Thomas Edison"
  ];

  filterList(q: string, list: string[]) {
    return list.filter(function(item) {
      return item.toLowerCase().startsWith(q.toLowerCase());
    });
  }

  /* TODO use API here */
  getCountries(q: string) {
    this.updateInputAutocompleteData(this.filterList(q, this.countries));
  }

  /* TODO use API here */
  getTags(q: string) {
    this.updateTextareaAutocompleteData("#", this.filterList(q, this.tags));
  }

  /* TODO use API here */
  getUsers(q: string) {
    this.updateTextareaAutocompleteData("@", this.filterList(q, this.users));
  }

  updateInputAutocomplete(response: CdAutocompleteResponse): void {
    this.getCountries(response.q);
  }

  updateInputAutocompleteData(list: string[]): void {
    this.inputAutocomplete.list = list;
    this.inputAutocomplete.changeTrigger = !this.inputAutocomplete.changeTrigger;
  }

  updateTextareaAutocomplete(response: CdAutocompleteResponse): void {
    if (response.key === "#") {
      this.getTags(response.q);
    } else if (response.key === "@") {
      this.getUsers(response.q);
    }
  }

  updateTextareaAutocompleteData(key: string, data: any): void {
    console.log("updateTextareaAutocompleteData");
    console.log(data);
    for (let i = 0; i < this.textareaAutocomplete.data.length; i++) {
      if (this.textareaAutocomplete.data[i].key === key) {
        this.textareaAutocomplete.data[i].data = data;
        this.textareaAutocomplete.changeTrigger = !this.textareaAutocomplete.changeTrigger;
        break;
      }
    }
  }
}
