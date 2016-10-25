import { CdAutocompleteData } from "./cd-autocomplete-data.model";

export class CdAutocomplete {
  changeTrigger: boolean = false;
  data?: CdAutocompleteData[];
  list?: string[];
}
