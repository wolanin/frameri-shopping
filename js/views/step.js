/*

var StepView = Backbone.View.extend({
  tagName: 'section', // name of tag to be created     
  template: _.template($('#step-template').html()),   
  events: {
    'click input.next': 'nextStep',
     'click #add-lens': 'addLens'

  },    
  initialize: function(){
    //console.log('init StepView')
    _.bindAll(this, 'render', 'unrender',  'remove'); // every function that uses 'this' as the current object should be in here
    
    this.model.bind('remove', this.unrender);

   // this.collection = new Steps();  // new INSTANCE of steps, not sure if I like creating all these instances. idk if this is bad
    
    // it messed up #add-lens event
    // Not a great way to do this
    this.model.on('change', this.render, this);

    
    this.lensCollection = new LensList();
    // switch statement here..

    


    ///this.contentView = this.getContentView(this);





    //this.contentView.parentView = this;

    
    //console.log(this.lensCollection)
    
  },
  render: function(){
    //$(this.el).html('<span style="color:black;">'+this.model.get('name')+' '+this.model.get('state')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
    // Depending which step, render something different

    //console.log(this.model.get('name'))

    //var tmpView = newLensView({model:this.model})
    //this.$el.find('.content').append(lensView.render().el);

    this.$el.html(this.template(this.model.toJSON()));
    
    //doing this in a sub section now
    //this.$el.addClass(this.model.get('state')).addClass(this.model.get('name'));
    
    // not the best place for this
    $('section.pending :input').prop("disabled", true);

    // append the content now..

    //this.$el.find('.content').html(this.contentView.render().el);
    this.$el.find('.content').html('woah');

    this.$el.find('.content').addClass(this.model.get('state')).addClass(this.model.get('name'));


    //console.log('render Step ' + this.model.get('name'));
    return this; // for chainable calls, like .render().el

  },
  addLens : function(){
    //console.log('adding new lens from stepView')
    var newLens = new LensItem({name: 'new lens'});
    
    //var lensView = new LensView({model: newLens});


   // this.$el.find('.lenses').append(lensView.render().el);

    this.lensCollection.create(newLens);
    this.contentView.render().el
  },
  reRender : function(){
    console.log('step changed, reRender called');
    


  },
  unrender: function(){
    $(this.el).remove();
  },
  getContentView : function(self){
    //console.log(this.model.get('name'))
    switch(this.model.get('name')){
      case 'frames':
        contentView = new FramesStepView(); //should probly pass this some data
        break;
      case 'lenses':
        contentView = new LensesStepView();
        break;         
      case 'key':
        contentView = new KeyStepView();
        break;         
      case 'review':
        contentView = new ReviewStepView();
        break;            
      default:
        alert('whoops')
        break;
      }
    return contentView;
  },
  remove: function(){
    this.model.destroy();
  },
  nextStep : function(){
    //console.log(this.contentView.collection)

    var nextStep = this.collection.at(this.model.get('next')-1);

    var isValid = true;

    if(this.model.get('step') == 1){// Frames
      if(this.validateFrameStep() == false)
        isValid = false;

    }

    if(this.model.get('step') == 2){// Lenses
      this.validateLensesStep()
    }


    if(isValid){// re-render two steps
      this.model.save({state:'completed'});


      // now I gotta re-render

    } else { // set set to invalid
      alert('set current step to invalid and do not proceed')
    }


  },
  validateFrameStep : function(){

    if(this.contentView.collection.getSelected().length < 3){
     // alert('not enough frames selected')
      return false;
    }

  },
  validateLensesStep : function(){
    // new instance of lenses. i believe this only exists for this function
    var selectedLenses = new LensList();
    selectedLenses.each(this.validateLensSelections,this)

  },
  validateLensSelections : function(lens){
    console.log('validate lens')
    if(lens.get('type') == '')
      alert('this lens has no type')
  },
});
*/