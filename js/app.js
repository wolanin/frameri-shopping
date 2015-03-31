/* this overrides the local stoage

Backbone.sync = function(method, model, success, error){
    success();
  }
*/

//var rendered_html = render('mytemplate', {});

// Defining a namespace so this render function works happens in index.html now
//var frameri = {};

  frameri.HeaderView = Backbone.View.extend({
    tagName: 'header', // name of tag to be created     
    el: $('#header'), // el attaches to existing element
    events: {
    },   
    initialize: function(){
      //this.render();
    },
    render: function(){
      var activeState = '';
      var stepList = this.collection;
      var activeStepList = stepList.findByState('active');
      var activeStep = activeStepList.at(0);
      this.template = _.template(frameri.render('header', {active:activeStep.get('name')} ));
      this.$el.html(this.template);
      return this; // enable chained calls
    },
  });


  
frameri.StoreView = Backbone.View.extend({
  el: $('#store'), // el attaches to existing element
  events: {
    'click .frames.next': 'validateFramesStep',
    'click .lenses.next':  'validateLensesStep',
    'click .lenses.previous':  'backToFrames',
    'click .key.next':  'validateKeyStep',
    'click .key.previous':  'backToLenses',
  },
  initialize: function(){
    _.bindAll(this, 'render', 'addItem', 'appendStep'); // every function that uses 'this' as the current object should be in here
    this.collection = new Steps();  // new INSTANCE of steps
    this.render();
    this.updateStates();
    this.collection.on('change',this.updateStates,this)
  },
    render: function(){
      // clear everything, this is probly bad!!
      this.$el.empty();
      var self = this;

      // might consider setting these to the namespace
      // Render Header
      this.headerView = new frameri.HeaderView({collection:this.collection});
      this.$el.append(this.headerView.render().el);

      // Render Frame Step
      this.framesStepView = new frameri.FramesStepView({model: this.collection.at(0)});
      this.$el.append(this.framesStepView.render().el)

      // Render Lenses Step
      this.lensesStepView = new frameri.LensesStepView();
      this.$el.append(this.lensesStepView.render().el);

      // Render Key Step
      this.keyStepView = new frameri.KeyStepView();
      this.$el.append(this.keyStepView.render().el);


      // there was a loop here.

    },
    previousStep: function(){
      var activeSteps = this.collection.findByState('active')
      var activeStep = activeSteps.at(0);
      if(activeStep.get('step') <= 1){
        alert('you are at the first step!!');
        return
      }
      var previousStep = this.collection.at(activeStep.get('next')-3);
      activeStep.save({state:'pending'});
      previousStep.save({state:'active'});
      this.render();  // baaad.. this re-renders everything
    },
    addItem: function(){
      this.counter++;
      var step = new Step();
      step.set({
        name: 'step' + this.counter // modify item defaults
      });
      this.collection.create(step);
    },


    appendStep: function(step){ // append step view
      var stepView = new StepView({model: step});
      this.$el.append(stepView.render().el);
    },
    updateStates : function(){

      var frameStep = this.collection.at(0);
      this.framesStepView.setState(frameStep.get('state'))
    
      var lensStep = this.collection.at(1);
      this.lensesStepView.setState(lensStep.get('state'))

      this.keyStepView.setState(this.collection.at(2).get('state'))
      

    },

    validateFramesStep : function (){
      var frameList = new FrameList().getSelected();
      if(frameList.length <3) {
        alert('unable to proceed to lenses, not enough frames chosen.')
      } else {
        this.collection.at(0).save({state:'completed'}); // this should fire something else
        this.collection.at(1).save({state:'active'}); 
      }
    },
    backToFrames : function(){
      this.collection.at(0).save({state:'active'});
      this.collection.at(1).save({state:'pending'});
    },
    validateLensesStep : function (){
      // just always set this valid for now
        this.collection.at(1).save({state:'completed'}); // this should fire something else
        this.collection.at(2).save({state:'active'}); 
      
    },
    backToLenses : function(){
      this.collection.at(1).save({state:'active'});
      this.collection.at(2).save({state:'pending'});
    },
    validateKeyStep : function (){
      var frameList = new FrameList().getSelected();
      if(frameList.length <3) {
        alert('unable to proceed to lenses, not enough frames chosen.')
      } else {
        this.collection.at(0).save({state:'completed'}); // this should fire something else
        this.collection.at(1).save({state:'active'}); 
      }
    },
    backToKeyStep : function(){
      this.collection.at(0).save({state:'active'});
      this.collection.at(1).save({state:'pending'});
    }
  });

  frameri.storeView = new frameri.StoreView();