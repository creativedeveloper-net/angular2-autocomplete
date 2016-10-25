"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var cd_autocomplete_model_1 = require("./cd-autocomplete.model");
var cd_autocomplete_component_1 = require("./cd-autocomplete.component");
var cd_autocomplete_response_model_1 = require("./cd-autocomplete-response.model");
var CdAutocompleteDirective = (function () {
    function CdAutocompleteDirective(componentFactoryResolver, differs, elementRef, renderer, viewContainerRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.differs = differs;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.inputValue = "";
        this.key = "";
        this.q = "";
        this.cdAutocompleteUpdate = new core_1.EventEmitter();
        this.ngModelChange = new core_1.EventEmitter(false);
        this.differ = differs.find({}).create(null);
    }
    CdAutocompleteDirective.prototype.onModelChange = function (event) {
        if (event.length > 0) {
            this.inputValue = event;
            this.update();
        }
        else {
            this.hide();
        }
    };
    CdAutocompleteDirective.prototype.ngDoCheck = function () {
        if (this.differ) {
            var changes = this.differ.diff(this.cdAutocomplete);
            if (changes) {
                this.updateComponent();
            }
        }
    };
    CdAutocompleteDirective.prototype.ngOnInit = function () {
        var _this = this;
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(cd_autocomplete_component_1.CdAutocompleteComponent);
        this.autocompleteComponent = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(cd_autocomplete_component_1.CdAutocompleteComponent));
        this.autocompleteComponent.instance.onChanged.subscribe(function (value) {
            if (_this.cdAutocomplete.list) {
                _this.ngModelChange.emit(value);
                _this.renderer.invokeElementMethod(_this.elementRef.nativeElement, "focus", []);
            }
            else if (_this.cdAutocomplete.data && _this.key.length > 0 && (_this.lastIndex + _this.key.length) <= _this.inputValue.length) {
                var newInputValue = _this.inputValue.substring(0, (_this.lastIndex + _this.key.length)) + value + " ";
                _this.ngModelChange.emit(newInputValue);
                _this.renderer.invokeElementMethod(_this.elementRef.nativeElement, "focus", []);
            }
        });
    };
    CdAutocompleteDirective.prototype.getBottomOffset = function (element) {
        element = element.getBoundingClientRect();
        return {
            left: element.left + window.scrollX + element.offsetHeight,
            top: element.top + window.scrollY
        };
    };
    CdAutocompleteDirective.prototype.hide = function () {
        if (this.autocompleteComponent) {
            this.autocompleteComponent.instance.hide = true;
        }
    };
    CdAutocompleteDirective.prototype.update = function () {
        if (this.autocompleteComponent) {
            this.autocompleteComponent.instance.data = [];
        }
        if (this.cdAutocomplete.list) {
            this.cdAutocompleteUpdate.emit(new cd_autocomplete_response_model_1.CdAutocompleteResponse(this.inputValue));
        }
        else if (this.cdAutocomplete.data) {
            this.key = "";
            this.q = "";
            this.lastIndex = -1;
            for (var _i = 0, _a = this.cdAutocomplete.data; _i < _a.length; _i++) {
                var data = _a[_i];
                if (this.inputValue.lastIndexOf(data.key) > this.lastIndex) {
                    this.lastIndex = this.inputValue.lastIndexOf(data.key);
                    this.key = data.key;
                }
            }
            if (this.key.length > 0) {
                if (this.lastIndex + this.key.length < this.inputValue.length) {
                    this.q = this.inputValue.substring((this.lastIndex + this.key.length));
                }
                this.cdAutocompleteUpdate.emit(new cd_autocomplete_response_model_1.CdAutocompleteResponse(this.q, this.key));
            }
            else {
                if (this.autocompleteComponent) {
                    this.autocompleteComponent.instance.data = [];
                }
            }
        }
    };
    CdAutocompleteDirective.prototype.updateComponent = function () {
        if (this.cdAutocomplete.list) {
            this.autocompleteComponent.instance.data = this.cdAutocomplete.list;
        }
        else if (this.cdAutocomplete.data && this.key.length > 0) {
            for (var i = 0; i < this.cdAutocomplete.data.length; i++) {
                if (this.cdAutocomplete.data[i].key === this.key) {
                    this.autocompleteComponent.instance.data = this.cdAutocomplete.data[i].data;
                    break;
                }
            }
        }
    };
    CdAutocompleteDirective.prototype.updateComponentPosition = function () {
        if (this.autocompleteComponent) {
            this.autocompleteComponent.instance.top = this.getBottomOffset(this.elementRef.nativeElement).top;
            this.autocompleteComponent.instance.left = this.getBottomOffset(this.elementRef.nativeElement).left;
        }
    };
    __decorate([
        core_1.HostListener("ngModelChange", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [String]), 
        __metadata('design:returntype', void 0)
    ], CdAutocompleteDirective.prototype, "onModelChange", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', cd_autocomplete_model_1.CdAutocomplete)
    ], CdAutocompleteDirective.prototype, "cdAutocomplete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CdAutocompleteDirective.prototype, "cdAutocompleteUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CdAutocompleteDirective.prototype, "ngModelChange", void 0);
    CdAutocompleteDirective = __decorate([
        core_1.Directive({
            selector: "[cdAutocomplete]"
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.KeyValueDiffers, core_1.ElementRef, core_1.Renderer, core_1.ViewContainerRef])
    ], CdAutocompleteDirective);
    return CdAutocompleteDirective;
}());
exports.CdAutocompleteDirective = CdAutocompleteDirective;
//# sourceMappingURL=cd-autocomplete.directive.js.map