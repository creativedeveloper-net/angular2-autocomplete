import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "cd-autocomplete",
  styles: [`
      ul {
        position: fixed;
        margin: 0;
        padding: 0;
        background: #fff;
        list-style-type: none;
        border: 1px solid #dddddd;
      }
      li {
        cursor: pointer;
        font-size: 12px;
        margin: 0;
        padding: 3px;
      }
      li:hover {
        background: #369;
        color: #fff;
      }
    `],
  template: `
    <ul *ngIf="data.length > 0 && show" [style.top]="top" [style.left]="left">
      <li *ngFor="let item of data" (click)="addValue(item)">
        {{item}}
      </li>
    </ul>
    `
})
export class CdAutocompleteComponent {
  autocompleteList: string[] = [];
  lastSelected: string;
  left: number;
  show = true;
  top: number;

  get data(): string[] {
    return this.autocompleteList;
  }
  @Input() set data(data: string[]) {
    if (!(data && data.length === 1 && data[0] === this.lastSelected)) {
      this.show = true;
    }
    this.autocompleteList = data;
  }
  @Input() set hide(hide: boolean) {
    if (hide) {
      this.show = false;
    }
  }

  @Output() onChanged = new EventEmitter<string>();

  addValue(value: string) {
    this.onChanged.emit(value);
    this.lastSelected = value;
    this.show = false;
  }
}
