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
var CdAutocompleteComponent = (function () {
    function CdAutocompleteComponent() {
        this.autocompleteList = [];
        this.show = true;
        this.onChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(CdAutocompleteComponent.prototype, "data", {
        get: function () {
            return this.autocompleteList;
        },
        set: function (data) {
            if (!(data && data.length === 1 && data[0] === this.lastSelected)) {
                this.show = true;
            }
            this.autocompleteList = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdAutocompleteComponent.prototype, "hide", {
        set: function (hide) {
            if (hide) {
                this.show = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    CdAutocompleteComponent.prototype.addValue = function (value) {
        this.onChanged.emit(value);
        this.lastSelected = value;
        this.show = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CdAutocompleteComponent.prototype, "data", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], CdAutocompleteComponent.prototype, "hide", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CdAutocompleteComponent.prototype, "onChanged", void 0);
    CdAutocompleteComponent = __decorate([
        core_1.Component({
            selector: "cd-autocomplete",
            styles: ["\n      ul {\n        position: fixed;\n        margin: 0;\n        padding: 0;\n        background: #fff;\n        list-style-type: none;\n        border: 1px solid #dddddd;\n      }\n      li {\n        cursor: pointer;\n        font-size: 12px;\n        margin: 0;\n        padding: 3px;\n      }\n      li:hover {\n        background: #369;\n        color: #fff;\n      }\n    "],
            template: "\n    <ul *ngIf=\"data.length > 0 && show\" [style.top]=\"top\" [style.left]=\"left\">\n      <li *ngFor=\"let item of data\" (click)=\"addValue(item)\">\n        {{item}}\n      </li>\n    </ul>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CdAutocompleteComponent);
    return CdAutocompleteComponent;
}());
exports.CdAutocompleteComponent = CdAutocompleteComponent;
//# sourceMappingURL=cd-autocomplete.component.js.map