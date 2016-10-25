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
var index_1 = require("./directives/cd-autocomplete/index");
var AppComponent = (function () {
    function AppComponent() {
        this.countries = [
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
        this.inputValue = "";
        this.inputAutocomplete = {
            changeTrigger: false,
            list: []
        };
        this.tags = [
            "tag",
            "test",
            "angular",
            "autocomplete"
        ];
        this.textareaAutocomplete = {
            changeTrigger: false,
            data: [
                new index_1.CdAutocompleteData([], "#"),
                new index_1.CdAutocompleteData([], "@")
            ]
        };
        this.textareaValue = "";
        this.users = [
            "Albert Einstein",
            "Isaac Newton",
            "Leonardo Da Vinci",
            "Nikola Tesla",
            "Thomas Edison"
        ];
    }
    AppComponent.prototype.filterList = function (q, list) {
        return list.filter(function (item) {
            return item.toLowerCase().startsWith(q.toLowerCase());
        });
    };
    /* TODO use API here */
    AppComponent.prototype.getCountries = function (q) {
        this.updateInputAutocompleteData(this.filterList(q, this.countries));
    };
    /* TODO use API here */
    AppComponent.prototype.getTags = function (q) {
        this.updateTextareaAutocompleteData("#", this.filterList(q, this.tags));
    };
    /* TODO use API here */
    AppComponent.prototype.getUsers = function (q) {
        this.updateTextareaAutocompleteData("@", this.filterList(q, this.users));
    };
    AppComponent.prototype.updateInputAutocomplete = function (response) {
        this.getCountries(response.q);
    };
    AppComponent.prototype.updateInputAutocompleteData = function (list) {
        this.inputAutocomplete.list = list;
        this.inputAutocomplete.changeTrigger = !this.inputAutocomplete.changeTrigger;
    };
    AppComponent.prototype.updateTextareaAutocomplete = function (response) {
        if (response.key === "#") {
            this.getTags(response.q);
        }
        else if (response.key === "@") {
            this.getUsers(response.q);
        }
    };
    AppComponent.prototype.updateTextareaAutocompleteData = function (key, data) {
        console.log("updateTextareaAutocompleteData");
        console.log(data);
        for (var i = 0; i < this.textareaAutocomplete.data.length; i++) {
            if (this.textareaAutocomplete.data[i].key === key) {
                this.textareaAutocomplete.data[i].data = data;
                this.textareaAutocomplete.changeTrigger = !this.textareaAutocomplete.changeTrigger;
                break;
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n    <h1>Angular 2 autocomplete</h1>\n    <p>Example of simple autocomplete functionality implemented in Angular 2</p>\n    <h2>Input autocomplete</h2>\n    <p>Please try to type in the input below one of the country from this list:\n      <span *ngFor=\"let item of countries; let i = index\">\n        <template [ngIf]=\"i > 0\">, </template>\n        {{item}}\n      </span>\n    </p>\n    <div>\n      <input\n        [(ngModel)]=\"inputValue\"\n        [cdAutocomplete]=\"inputAutocomplete\"\n        (cdAutocompleteUpdate)=\"updateInputAutocomplete($event)\"\n        type=\"text\"\n        placeholder=\"Country\"/>\n    <div>\n    <h2>Textarea autocomplete</h2>\n    <p>You can invoke autocomplete in the textarea below by typing # (for tags) or @ (for names)</p>\n    <div>\n      <textarea\n        [(ngModel)]=\"textareaValue\"\n        [cdAutocomplete]=\"textareaAutocomplete\"\n        (cdAutocompleteUpdate)=\"updateTextareaAutocomplete($event)\"\n        rows=\"4\" placeholder=\"Type post...\">\n      </textarea>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map