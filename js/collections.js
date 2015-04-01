var FrameList = Backbone.Collection.extend({
  model: FrameItem,
  localStorage: new Store("frameri-frame"), // this will be something else
  initialize : function(){
    //console.log('framelist');
    this.fetch()
    if(this.length == 0){
      this.createFrameList()
    }
  },
  createFrameList : function(){      // not totally sure this is the best spot
//      this.create({step:1,name:'frames',state:'active',next:2});
    console.log('create frame list')

    this.create({sku:'tidal_leon_black',name:'Leon - Black'})
    this.create({sku:'tidal_leon_granite',name:'Leon - Granite'})
    this.create({sku:'tidal_drebbel_forest',name:'Drebbel - Forest'})
    this.create({sku:'tidal_drebbel_fire',name:'Drebbel - Fire'})
    this.create({sku:'tidal_magellan_cheetah',name:'Magellan - Cheetah'})
  },
  getSelectedd: function() {
      return this.filter(function( frame ) {
        return frame.get('selected');
      });
    },
  getSelected: function() {
    filtered = this.filter(function(frame){
      return frame.get('selected') === true
    });
    return new FrameList(filtered)
  },
});

var LensList = Backbone.Collection.extend({
    model: LensItem,
    localStorage: new Store("frameri-lens"), // this will be something else
    initialize : function(){
      //console.log('framelist');
      this.fetch()
      if(this.length == 0){
        this.createFirstLens()
      }
    },
    createFirstLens : function(){      // not totally sure this is the best spot
      this.create({name:'first lens'});
    }
  });

  var Steps = Backbone.Collection.extend({
    model: Step,
    localStorage: new Store("frameri-steps"),

    initialize : function(){

      // if state changes, change the states
      this.on( "change:state", this.changeState);

      
      this.fetch();
      if(this.length == 0){
        this.createStepData();
      }
    },

    createStepData : function(){      // not totally sure this is the best spot
      this.create({step:1,name:'frames',state:'active',next:2});
      this.create({step:2,name:'lenses',state:'pending',next:3});
      this.create({step:3,name:'key',state:'pending',next:4});
      this.create({step:4,name:'review',state:'pending',next:false});
      alert('WELCOME TO THE SHOPPING EXPERIENCE!');  //this should not block execution though
    },
    resett : function(){},

    findByState : function(stepNumber) {
      filtered = this.filter(function(step) {
        return step.get("state") === stepNumber;
      });
      return new Steps(filtered);
    },
    findByName : function(stepName) {
      filtered = this.filter(function(step) {
        return step.get("name") === stepName;
      });
      return new Steps(filtered);
    },

    changeState : function(model,val,options){// when a state gets set to active, set the next step to pending and previous to complete
      return;
      // this shit isnt working
      console.log(model.get('name')+' changed in the Step Collection!');
      if(model.get('state') == 'active'){
        var currentIndex = model.get('step')-1; 
        console.log(currentIndex)
        if(currentIndex != 0){
          var previousStep = this.at(currentIndex-1);
          previousStep.save({state:'completed'}); 
        }
        if(currentIndex != 3){
          var nextStep = this.at(currentIndex+1);
          nextStep.save({state:'pending'}); 
        }

      } else{
        //console.log('Collection was updated, but model was not set to complete')
      }

    }


  });
