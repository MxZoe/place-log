//PlaceLog business logic
function PlaceLog(){
  this.places = {};
  this.currentID = 0;
}

PlaceLog.prototype.addPlace = function(place){
  place.id  = this.assignId();
  this.places[place.id] = place;
};

PlaceLog.prototype.assignID = function(){
  this.currentID += 1;
  return this.currentID;
};

PlaceLog.prototype.findPlace = function(id){
  if(this.places[id] != undefined){
    return this.places[id];
  }
  return false;
};

PlaceLog.prototype.deleteContact = function(id){
  if(this.places === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
};



//Places business logic
function Places(name, landmark, location, notes){
  this.name = name;
  this.landmark = landmark;
  this.location = location;
  this.notes = notes;
}


//ui logic
let placeLog = new PlaceLog();
