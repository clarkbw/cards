if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var Backbone = require('backbone'),
      _        = require('underscore'),
      Card     = require('app/card'),
      Deck     = require('app/deck');

  var StandardDeck = Deck.extend({
    suits : [
      Card.SPADES,
      Card.HEARTS,
      Card.CLUBS,
      Card.DIAMONDS
    ],
    cards : [
      { name : "A" , value : 14 } , { name : "K" , value : 13 },
      { name : "Q" , value : 12 }, { name : "J" , value : 11 },
      { name : "10" , value : 10 }, { name : "9" , value : 9 },
      { name : "8" , value : 8 }, { name : "7" , value : 7 },
      { name : "6" , value : 6 }, { name : "5" , value : 5 },
      { name : "4" , value : 4 }, { name : "3" , value : 3 },
      { name : "2" , value : 2 }
    ],
    color : function(card) {
      var suit = card.get("suit");
      return (suit == Card.DIAMONDS || suit == Card.HEARTS) ? "#E0241B" : "#333";
    },
    initialize : function() {

    },
    deal : function() {
      var list = [];
      this.suits.forEach(function(suit) {
        this.cards.forEach(function(card) {
          list.push({ suit : suit, name : card.name, value : card.value });
        }.bind(this));
      }.bind(this));
      this.reset(list, {silent:true});
      this.shuffle();
      this.trigger("reset");
    }
  });

  //The value returned from the function is
  //used as the module export visible to Node.
  return StandardDeck;
  return function() { return StandardDeck; }
});
