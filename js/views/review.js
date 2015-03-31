var ReviewFrameView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#review-frame-item-template').html()),
  events:{
     'click .destroy': 'deselect'
  },
  initialize : function(){
    this.model.on('change', this.destroy, this);  // remove is a default function, apperantly
    this.render()
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  },
  deselect : function (){
    this.model.save({selected:false})
    this.remove(); // remove frame list
  },
});

var ReviewLensView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#review-lens-item-template').html()),
  events:{
     'click .destroy': 'deselect'
  },
  initialize : function(){
    this.model.on('change', this.destroy, this);  // remove is a default function, apperantly
    this.render()
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  },
  deselect : function (){
    this.model.destroy();
    this.remove(); // remove frame list
  },
});


var ReviewGlassesView = Backbone.View.extend({
  tagName: 'section',
  template: _.template($('#review-glasses-item-template').html()),
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
    console.log('render glasses row')
    
    var selectedFrames = new FrameList().getSelected();
    this.$el.append('<li>'+this.model.get('tint')+'_'+this.model.get('key')+'_'+this.model.get('type')+'</li>')

    selectedFrames.each(function(frame){
      this.$el.append('<li>'+frame.get('name')+'</li>')
    },this)
    
    return this; // enable chained calls

  },

  reRender : function(){
    console.log('re-render');

  },
  destroy : function (){
    this.model.destroy();
  }
});


var ReviewStepView = Backbone.View.extend({
  tagName: 'section', // name of tag to be created     
  template: _.template($('#review-step-template').html()),   
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
    lensCollection.each(this.appendLens,this);
  },
  appendLens : function(lens){
    $container = this.$el.find("#review-lenses")    
    var lensesView = new ReviewLensView({model:lens})
    $container = this.$el.find("#review-lenses")
    $container.append(lensesView.render().el)
  },
  appendFrames : function (){
    frameCollection = new FrameList();
    selectedFrames = frameCollection.getSelected();
    selectedFrames.each(this.appendFrame,this);
  },
  appendFrame : function(frame){
    var frameView = new ReviewFrameView({model:frame})
    $container = this.$el.find("#review-frames")
    $container.append(frameView.render().el)
  },
  renderGlassesOptions : function(lens){
  
   var glassesView = new ReviewGlassesView({model: lens});

   this.$el.find('#review-glasses').append(glassesView.render().el);
  
  },
  appendAllGlasses : function() {
    
    var selectedLenses = new LensList()
    selectedLenses.each(this.renderGlassesOptions,this)

  },



});