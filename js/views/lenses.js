frameri.LensView = Backbone.View.extend({
  tagName: 'div',
 // template: _.template(frameri.render('lens_item', {})),  
  events:{
     'click .destroy': 'destroy',
     'change .type': 'setType',
     'click .tint': 'setTint'
  },
  initialize : function(){
    this.model.on('destroy', this.remove, this);  // remove is a default function, apperantly
  },
  render: function(){
    this.template = _.template(frameri.render('lens_item', this.model.toJSON()))
    this.$el.html(this.template)
    this.appendAllGlasses();
    return this; // enable chained calls
  },
  destroy : function(){
    this.model.destroy();
    this.remove()
  },

  setType : function(e){
    var value = $(e.currentTarget).val()
    this.model.set({type:value})
    this.model.save();
  },
  setTint : function(e){
    var value = $(e.currentTarget).val()
    this.model.set({tint:value})
    this.model.save();
    this.render();  // probly bad way to do this

  },
   appendAllGlasses: function(lensData){
    var selectedFrames = new FrameList().getSelected()
    selectedFrames.each(this.appendGlasses,this)
  },
  appendGlasses : function(glasses){
    $img = $("<img>").addClass('product').attr('src',"https://d2958htcjkur1i.cloudfront.net/shop/photos/medium/tidal/"+glasses.get('sku')+"_"+this.model.get('tint')+"_crystal_front.jpg");
    $div = $('<div>').addClass('col-md-3').append($img)
    this.$el.find('.glasses').append($div); 
  },
});



frameri.LensesStepView = Backbone.View.extend({
  tagName: 'section', // name of tag to be created     
  template: _.template(frameri.render('lenses_step', {})),    
  //el: "#lens-step",
  events: {
    'click #add-lens': 'addLens'
  },
  initialize: function(){
    this.collection = new LensList(); // this adds a lens if there are none
  },
  render: function(){
    this.$el.html(this.template());
    this.appendAllLenses();
    return this; // for chainable calls, like .render().el
  },
  addLens : function(lens){
    var newLens = new LensItem({name: 'new lens'});
    this.collection.create(newLens);
    this.appendLens(newLens); // ideally this fires from an event i think
  },
  appendLens : function(lens){
    var lensView = new frameri.LensView({model: lens});
    this.$el.find('section.lenses').append(lensView.render().el);
  },
  appendAllLenses : function(){
    this.collection.each(this.appendLens,this);
  },
 setState : function(state){
    $(this.el).removeClass()
    $(this.el).addClass(state)
  },

});