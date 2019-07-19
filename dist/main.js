"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_import_1 = require("./meteor-import");
var publications = {};
exports.publications = publications;
var AbstractPublication = /** @class */ (function () {
    function AbstractPublication(name, methodToRun, collections) {
        this.collections = collections;
        this.name = name;
        this.methodToRun = methodToRun;
        if (meteor_import_1.Meteor.isServer) {
            meteor_import_1.Meteor.publish(this.name, methodToRun);
        }
        publications[this.name] = this;
    }
    AbstractPublication.prototype.subscribe = function (data) {
        console.log('subscribing: ');
        var options = {
            onStop: function (error) {
                if (error)
                    console.log(error);
            }
        };
        return (data === undefined || data === null)
            ? meteor_import_1.Meteor.subscribe(this.name, options)
            : meteor_import_1.Meteor.subscribe(this.name, data, options);
    };
    AbstractPublication.prototype.withData = function (data) {
        return new PublicationAndData(this, data);
    };
    return AbstractPublication;
}());
exports.AbstractPublication = AbstractPublication;
var PublicationAndData = /** @class */ (function () {
    function PublicationAndData(publication, data) {
        this.publication = publication;
        this.data = data;
    }
    PublicationAndData.prototype.subscribe = function () {
        return this.publication.subscribe(this.data);
    };
    return PublicationAndData;
}());
exports.PublicationAndData = PublicationAndData;
var PublicationWithoutArgs = /** @class */ (function (_super) {
    __extends(PublicationWithoutArgs, _super);
    function PublicationWithoutArgs(name, methodToRun, collections) {
        return _super.call(this, name, methodToRun, collections) || this;
    }
    PublicationWithoutArgs.prototype.subscribe = function () {
        return _super.prototype.subscribe.call(this);
    };
    PublicationWithoutArgs.prototype.withData = function () {
        return _super.prototype.withData.call(this);
    };
    return PublicationWithoutArgs;
}(AbstractPublication));
exports.PublicationWithoutArgs = PublicationWithoutArgs;
var Publication = /** @class */ (function (_super) {
    __extends(Publication, _super);
    function Publication(name, methodToRun, collections) {
        return _super.call(this, name, methodToRun, collections) || this;
    }
    Publication.prototype.subscribe = function (data) {
        return _super.prototype.subscribe.call(this, data);
    };
    Publication.prototype.withData = function (data) {
        return _super.prototype.withData.call(this, data);
    };
    return Publication;
}(AbstractPublication));
exports.default = Publication;
//# sourceMappingURL=main.js.map