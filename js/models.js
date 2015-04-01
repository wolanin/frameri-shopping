var FrameItem = Backbone.Model.extend({
    defaults: {
      name: 'default name',
      selected: false,

    },
    toggleSelected: function(){
        this.save({ selected: !this.get('selected')});
        return this.get('selected'); // adding this for cart functionality
    }
  });
var LensItem = Backbone.Model.extend({
    defaults: {
      name: 'default name',
      selected: false,
      type: 'rx',
      tint:'optical',
      key:'crystal'

    },
    toggleSelected: function(){
        this.save({ selected: !this.get('selected')});
        return this.get('selected'); // adding this for cart functionality
    }
  });

var Step = Backbone.Model.extend({
	defaults: {
  	name: 'default name',
    state: 'default state'
  }
});
var CartItem = Backbone.Model.extend({
    defaults: {
      name: 'default name',
      type: 'default type',
    }
  });