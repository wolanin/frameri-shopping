frameri.KeyView = Backbone.View.extend({
  tagName: 'section',
  events:{
    'click .key': 'setKey'
  },
  render: function(){
    this.template = _.template(frameri.render('key_item', this.model.toJSON()))
    this.$el.html(this.template());
    this.appendAllGlasses();
    return this; // enable chained calls
  },
  setKey : function(e){
    var value = $(e.currentTarget).val()
    this.model.set({key:value})
    this.model.save();
    this.render();  // probly bad way to do this
  },
   appendAllGlasses: function(lensData){
    var selectedFrames = new FrameList().getSelected()
    selectedFrames.each(this.appendGlasses,this)
  },
  appendGlasses : function(glasses,lensData){
    $img = $("<img>").addClass('product').attr('src',"https://d2958htcjkur1i.cloudfront.net/shop/photos/medium/tidal/"+glasses.get('sku')+"_"+this.model.get('tint')+"_"+this.model.get('key')+"_front.jpg");

    $div = $('<div>').addClass('col-md-3').append($img)

    //this.$el.find('.glasses').append(glasses.get('name')+'_'+this.model.get('tint')); 
    this.$el.find('.glasses').append($div); 

    //this.$el.find('.glasses ul').append(glasses.get('name')+'_'+this.model.get('tint')+'_'+this.model.get('key')); 
  },

});


frameri.KeyStepView = Backbone.View.extend({
  tagName: 'section', // name of tag to be created     
  template: _.template(frameri.render('key_step', {})),  
  events: {
    'click .key-got-it': 'proceedToStep'
  },
  initialize: function(){},
  render: function(){
    this.$el.html(this.template());
    this.collection = new LensList(); // creating a new instance, might need to pull in the other list 
    this.appendAllLenses();
    this.$el.find('.lens-list').addClass('pendingg'); // would be nice to save this in step state
    return this;
  },

  appendLens : function(lens){
    var keyView = new frameri.KeyView({model: lens});
    this.$el.find('.lens-list').append(keyView.render().el)
  },
  appendAllLenses : function(){
    this.collection.each(this.appendLens,this)
  },

  setState : function(state){
    $(this.el).removeClass()
    $(this.el).addClass(state)
  },
  proceedToStep : function(){
    this.$el.find('.lens-list').removeClass('pending')
  }

});