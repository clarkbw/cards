define(["require","backbone","underscore","app/card"],function(require){var Backbone=require("backbone"),_=require("underscore"),Card=require("app/card"),Deck=Backbone.Collection.extend({model:Card.Model,shuffle:function(){return this.models=_.shuffle(this.models)},comparator:undefined});return Deck})