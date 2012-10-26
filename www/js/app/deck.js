if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var Backbone = require('backbone'),
      _        = require('underscore'),
      Card     = require('app/card');

  var Deck = Backbone.Collection.extend({
    model      : Card.Model,
    // override the shuffle function so we shuffle and save
    shuffle   : function shuffle() {
      return this.models = _.shuffle(this.models);
    },
    // we don't want a comparator otherwise the collection will always sort itself
    comparator : undefined
  });

  //The value returned from the function is
  //used as the module export visible to Node.
  return Deck;
  return function() { return Deck; }
});
