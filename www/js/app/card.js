if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var $       = require("jquery"),
      Backbone = require('backbone'),
      _        = require('underscore');

  var Card = Backbone.Model.extend({
    initialize : function() {
      
    },
    template: _.template($('#card-template').html()),
    validate: function(attrs) {
      if (! (attrs.value || attrs.suit || attrs.value)) {
        throw Error("Cards only have value or suit")
      }
    },
    color : function color() {
      return this.collection.color(this);
    },
    zIndex : function zIndex() {
      return this.collection.indexOf(this);
    }
  });

  //The value returned from the function is
  //used as the module export visible to Node.
  return {
    SPADES    : "&spades;",
    HEARTS    : "&hearts;",
    CLUBS     : "&clubs;",
    DIAMONDS  : "&diams;",
    Model     : Card
    };
  return function() { return Card; }
});
