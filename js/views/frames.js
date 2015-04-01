frameri.FrameView = Backbone.View.extend({
  tagName: 'div',
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
     // var frame = new CartItem({name:this.model.get('name')})
    } else { // remove this frame from the cart
      //var frame = storeView.cart.getByName(this.model.get('name'))
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
    this.collection = new FrameList();
    this.collection.on('change',this.validateStep,this);
      },
  render: function(){
    $(this.el).html(this.template());
    
    this.appendAllFrames();
    this.validateStep(); // cant do this in init because the button elem does not exist yet

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
    console.log(this.collection.getSelected().length)
    if(this.collection.getSelected().length <3) {
       this.$el.find('.btn-continue').prop("disabled",true);
       this.$el.find('.btn-continue').val('Choose at least 3 frames');
      } else {
        this.$el.find('.btn-continue').prop("disabled",false);
        this.$el.find('.btn-continue').val('CONTINUE');
      }
  },
  setState : function(state){
    $(this.el).removeClass();
    $(this.el).addClass(state);
  },

});