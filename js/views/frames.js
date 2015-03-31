frameri.FrameView = Backbone.View.extend({
  tagName: 'li',
  //template: _.template($('#frame-item-template').html()),
  //template: _.template(frameri.render('frame_item', {})),  
  events:{
    'click .toggle' : 'toggleSelected'
  },
  render: function(){
   
    //this.$el.html(this.template('frame_item',this.model.toJSON()));
    
    this.template = _.template(frameri.render('frame_item', this.model.toJSON())),

    this.$el.html(this.template);

    return this; // enable chained calls
  },
  initialize: function(){
    //console.log('tmpl load test');
    //var rendered_html = kevin.render('frame_item', {});
    //console.log(rendered_html)
    //this.model.on('change', this.render, this);
    //this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
  },      
  toggleSelected: function(){
    if(this.model.toggleSelected()){ // if true, add this frame to cart
      var frame = new CartItem({name:this.model.get('name')})
      
    } else { // remove this frame from the cart
      //console.log('removeing '+ this.model.get('name') + ' from cart')
      var frame = storeView.cart.getByName(this.model.get('name'))

    }
  }
});

frameri.FramesStepView = Backbone.View.extend({
  tagName: 'section', // name of tag to be created     
  template: _.template(frameri.render('frames_step', {})),  // probly dont want to do this here
  events: {
    'click .next': 'validateStep'
  },
  initialize: function(){
    console.log(this.model.get('name'))
  },
  render: function(){
    $(this.el).html(this.template());
    this.collection = new FrameList();
    this.appendAllFrames();
    return this; // for chainable calls, like .render().el
  },
  appendFrame : function(frame){
    var frameView = new frameri.FrameView({model: frame});
    this.$el.find("#frame-list").append(frameView.render().el);
  },
  appendAllFrames : function(){
    this.collection.each(this.appendFrame,this)
  },
  validateStep : function (){
    return;
    if(this.collection.length <3) {
      alert('unable to proceed to lenses, not enough frames chosen.')
    } else {
      this.model.save({state:'completed'})
    }
  },
  setState : function(state){
    $(this.el).removeClass();
    $(this.el).addClass(state);
  },

});