define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:
  // var util = require('./util');
  var StandardDeck = require("app/standard.deck");
  var Hand = require("app/hand");

  var $ = require("jquery");
  var Backbone = require('backbone');
  var _ = require("underscore");

  // http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
  (function($){
      $.fn.disableSelection = function() {
          return this
                   .attr('unselectable', 'on')
                   .css('user-select', 'none')
                   .on('selectstart', false);
      };
  })($);

  var CardView = Backbone.View.extend({
    tagName:  "div",
    className : "card",
    template: _.template($('#card-template').html()),
    initialize: function() {
      this.model.bind('destroy', this.remove, this);
      this.render();
    },
    render: function() {
      this.$el.html(this.template(this.model)).disableSelection().show();
      this.$el.css({'color' : this.model.color(), "z-index" : this.model.zIndex()});
      return this;
    },
    events: {
      "click" : "deal"
    },
    deal : function() {
      this.model.collection.trigger("deal", this.model);
    }
  });

  var DeckView = Backbone.View.extend({
    el: $("#deck"),
    initialize: function() {
      this.model.bind('all', this.render, this);
      this.model.bind('destroy', console.log, this);
    },
    render: function() {
      this.$el.empty();
      this.model.each(function(card, i) {
        var view = new CardView({model: card});
        view.$el.css("left", i * 3 + "px");
        this.$el.append(view.$el);
      }, this);
      return this;
    },

  });

  var HandView = Backbone.View.extend({
    el: $("#hand"),

    initialize: function() {
      this.model.bind('all', this.render, this);
      this.model.bind('add', this.render, this);
    },
    render: function() {
      this.$el.empty();
      var rstart = -20, rend = 35, 
          rotate = _.range(rstart, rend, Math.floor((Math.abs(rstart) + Math.abs(rend)) / this.model.length));
      var length = this.model.length,
          increase = Math.PI / length,
          counter = 0;
      this.model.each(function(card, i) {
        var view = new CardView({model: card});

        view.$el.css("transform", " rotate(" + rotate[i] + "deg)");
        view.$el.css("left", i * 60 + "px");
        var top = -20 * Math.sin(counter);
        counter += increase;
        view.$el.css("top", top + "px");
        this.$("#hand").append(view.$el);
      });
      return this;
    }
  });

  var AppView = Backbone.View.extend({
    events: {
      "click .card" : "deal"
    },
    initialize: function() {
      this.deck = new StandardDeck();
      this.deckview = new DeckView({model:this.deck});
      this.deck.bind("deal", this.deal, this);
      this.deck.deal();
      this.hand = new Hand();
      this.handview = new HandView({model:this.hand});
    },
    render: function() {
    },
    deal : function(model) {
      console.log("deal", model);
      this.deck.remove(model);
      this.hand.add(model);
    }
  });

  $(document).ready(function() {
    var App = new AppView;
  });
  console.log('Hello world');
});

