import {
  ComponentFactoryResolver,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  KeyValueDiffers,
  OnInit,
  Output,
  Renderer,
  ViewContainerRef } from "@angular/core";
import { CdAutocomplete } from "./cd-autocomplete.model";
import { CdAutocompleteComponent } from "./cd-autocomplete.component";
import { CdAutocompleteResponse } from "./cd-autocomplete-response.model";

@Directive({
  selector: "[cdAutocomplete]"
})
export class CdAutocompleteDirective implements OnInit, DoCheck {
  autocompleteComponent: any;
  differ: any;
  inputValue: string = "";
  key: string = "";
  lastIndex: number;
  q: string = "";

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private differs: KeyValueDiffers,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private viewContainerRef: ViewContainerRef) {
    this.differ = differs.find({}).create(null);
  }

  @HostListener("ngModelChange", ["$event"]) onModelChange(event: string) {
    if (event.length > 0) {
      this.inputValue = event;
      this.update();
    } else {
      this.hide();
    }
  }

  @Input() cdAutocomplete: CdAutocomplete;

  @Output() cdAutocompleteUpdate = new EventEmitter<CdAutocompleteResponse>();
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

  ngDoCheck() {
    if (this.differ) {
      let changes = this.differ.diff(this.cdAutocomplete);
      if (changes) {
        this.updateComponent();
      }
    }
  }

  ngOnInit(): void {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CdAutocompleteComponent);
    this.autocompleteComponent = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(CdAutocompleteComponent)
    );
    this.autocompleteComponent.instance.onChanged.subscribe((value: string) => {
      if (this.cdAutocomplete.list) {
        this.ngModelChange.emit(value);
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, "focus", []);
      } else if (this.cdAutocomplete.data && this.key.length > 0 && (this.lastIndex + this.key.length) <= this.inputValue.length) {
        let newInputValue = this.inputValue.substring(0, (this.lastIndex + this.key.length)) + value + " ";
        this.ngModelChange.emit(newInputValue);
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, "focus", []);
      }
    });
  }

  getBottomOffset(element: any) {
    element = element.getBoundingClientRect();
    return {
      left: element.left + window.scrollX + element.offsetHeight,
      top: element.top + window.scrollY
    };
  }

  hide() {
    if (this.autocompleteComponent) {
      this.autocompleteComponent.instance.hide = true;
    }
  }

  update() {
    if (this.autocompleteComponent) {
      this.autocompleteComponent.instance.data = [];
    }
    if (this.cdAutocomplete.list) {
      this.cdAutocompleteUpdate.emit(new CdAutocompleteResponse(this.inputValue));
    } else if (this.cdAutocomplete.data) {
      this.key = "";
      this.q = "";
      this.lastIndex = -1;
      for (let data of this.cdAutocomplete.data) {
        if (this.inputValue.lastIndexOf(data.key) > this.lastIndex) {
          this.lastIndex = this.inputValue.lastIndexOf(data.key);
          this.key = data.key;
        }
      }
      if (this.key.length > 0) {
        if (this.lastIndex + this.key.length < this.inputValue.length) {
          this.q = this.inputValue.substring((this.lastIndex + this.key.length));
        }
        this.cdAutocompleteUpdate.emit(new CdAutocompleteResponse(this.q, this.key));
      } else {
        if (this.autocompleteComponent) {
          this.autocompleteComponent.instance.data = [];
        }
      }
    }
  }

  updateComponent() {
    if (this.cdAutocomplete.list) {
      this.autocompleteComponent.instance.data = this.cdAutocomplete.list;
    } else if (this.cdAutocomplete.data && this.key.length > 0) {
      for (let i = 0; i < this.cdAutocomplete.data.length; i++) {
        if (this.cdAutocomplete.data[i].key === this.key) {
          this.autocompleteComponent.instance.data = this.cdAutocomplete.data[i].data;
          break;
        }
      }

    }
  }

  updateComponentPosition() {
    if (this.autocompleteComponent) {
      this.autocompleteComponent.instance.top = this.getBottomOffset(this.elementRef.nativeElement).top;
      this.autocompleteComponent.instance.left = this.getBottomOffset(this.elementRef.nativeElement).left;
    }
  }
}
