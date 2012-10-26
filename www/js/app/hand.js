if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var Backbone = require('backbone'),
      _        = require('underscore'),
      StandardDeck = require("app/standard.deck"),
      Card     = require('app/card');

  var Hand = StandardDeck.extend({
    model      : Card.Model,
    comparator : function(a, b) {
      return a.get("suit") == b.get("suit") && a.get("value") >= b.get("value");
    }
  });

  return Hand;

  //The value returned from the function is
  //used as the module export visible to Node.
  return function() { return Deck; }
});
