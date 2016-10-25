export class CdAutocompleteData {
  data: string[];
  key?: string;

  constructor(data: string[], key?: string)  {
    this.data = data;
    if (key) {
      this.key = key;
    }
  }
}
