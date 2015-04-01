frameri.ReviewFrameView = Backbone.View.extend({
  tagName:'div',
  events:{
     'click .destroy': 'deselect'
  },
  initialize : function(){
    this.model.on('change', this.destroy, this);  // remove is a default function, apperantly
    //this.render();
  },
  render: function(){
    this.template = _.template(frameri.render('review_frame', this.model.toJSON()))
    this.$el.html(this.template)
    return this; // enable chained calls
  },
  deselect : function (){
    this.model.save({selected:false})
    this.remove(); // remove frame list
  },
});

frameri.ReviewLensView = Backbone.View.extend({
  tagName: 'section',
  //template: _.template($('#review-lens-item-template').html()),
  events:{
     'click .destroy': 'deselect'
  },
  initialize : function(){
  },
  render: function(){
    template: _.template(frameri.render('review_lenses', {}));
    this.$el.html(this.template);
    this.appendAllLenses()

    return this; // enable chained calls
  },
  appendAllLenses: function(){
    this.collection.each(this.appendLens,this)
  },
  appendLens : function(lens){
    //$img = $("<img>").addClass('product').attr('src',"https://d2958htcjkur1i.cloudfront.net/shop/photos/medium/tidal/"+glasses.get('sku')+"_"+this.model.get('tint')+"_crystal_front.jpg");
    $link = $("<p>"+lens.get('tint')+lens.get('key')+"<button value='Remove' class='destroy'>Remove</button></p>");
    $div = $('<div>').addClass('col-md-3').append($link)
    $(this.el).append($div); 
  },
  deselect : function (){
    this.model.destroy();
    this.remove(); // remove frame list
  },
});


frameri.ReviewGlassesView = Backbone.View.extend({
  tagName: 'section',
  //template: _.template($('#review-glasses-item-template').html()),
  events:{
     //'click .destroy': 'destroy'
  },
  initialize : function(){
    this.collection = new LensList();
    this.collection.on('change', this.reRender, this);  // remove is a default function, apperantly
    this.collection.on('remove', this.reRender, this);  // remove is a default function, apperantly
    this.collection.on('destroy', this.reRender, this);  // remove is a default function, apperantly
   },
  render: function(){
    this.template = _.template(frameri.render('review_glasses_row', this.model.toJSON()))
    this.$el.html(this.template);
    this.appendAllFrames();
    return this; // enable chained calls

  },
  appendAllFrames : function(){
    var selectedFrames = new FrameList().getSelected()
    selectedFrames.each(this.appendFrame,this)

  },
  appendFrame : function(frame){  // this should be a template
    $img = $("<img>").addClass('product').attr('src',"https://d2958htcjkur1i.cloudfront.net/shop/photos/medium/tidal/"+frame.get('sku')+"_"+this.model.get('tint')+"_crystal_front.jpg");
    $div = $('<div>').addClass('col-md-4').append($img)
    this.$el.find('.frames').append($div); 

  },
  reRender : function(){
    console.log('re-render');

  },
  destroy : function (){
    this.model.destroy();
  }
});


frameri.ReviewStepView = Backbone.View.extend({
  tagName: 'section', // name of tag to be created     
  template: _.template(frameri.render('review_step', {})),  
  events: {},
  initialize : function(){
    this.selectedFrames = new FrameList().getSelected();
    this.selectedFrames.on('change',this.render,this)

  },
  render : function(){
    this.$el.html(this.template());
    this.appendFrames();
    this.appendLenses();
    this.appendAllGlasses();
    return this; // for chainable calls, like .render().el
  },

  appendLenses : function (){
    lensCollection = new LensList();
    var lensesView = new frameri.ReviewLensView({collection:lensCollection})
    $container = this.$el.find("#review-lenses")
    $container.append(lensesView.render().el)
  },
  appendFrames : function (){
    frameCollection = new FrameList();
    selectedFrames = frameCollection.getSelected();
    selectedFrames.each(this.appendFrame,this);
  },
  appendFrame : function(frame){
    var frameView = new frameri.ReviewFrameView({model:frame})
    $container = this.$el.find("#review-frames")
    $container.append(frameView.render().el)
  },
  renderGlassesOptions : function(lens){
  
   var glassesView = new frameri.ReviewGlassesView({model: lens});

   this.$el.find('#review-glasses').append(glassesView.render().el);
  
  },
  appendAllGlasses : function() {
    
    var selectedLenses = new LensList()
    selectedLenses.each(this.renderGlassesOptions,this)

  },
  setState : function(state){
    $(this.el).removeClass()
    $(this.el).addClass(state)
  },


});