export class CdAutocompleteResponse {
  key: string;
  q: string;

  constructor(q: string, key?: string) {
    this.q = q;
    if (key) {
      this.key = key;
    }
  }
}
