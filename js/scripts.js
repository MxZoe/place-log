//PlaceLog business logic
function PlaceLog(){
  this.places = {};
  this.currentID = 0;
}

PlaceLog.prototype.addPlace = function(place){
  place.id = this.assignID();
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

PlaceLog.prototype.deletePlace = function(id){
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

function displayPlaceDetails(placeLogToDisplay) {
  let placeList = $("ul#placeNames");
  let htmlForPlaceInfo = "";
  Object.keys(placeLogToDisplay.places).forEach(function(key) {
    const place = placeLogToDisplay.findPlace(key);
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.name + "</li>";
  });
  placeList.html(htmlForPlaceInfo);
}

function showPlace(placeID){
  const place = placeLog.findPlace(placeID);
  $(".show-places").show();
  $(".place-name").html(place.name);
  $(".landmark").html(place.landmark);
  $(".location").html(place.location);
  $(".notes").html(place.notes);
  let buttons = $("#buttons");
  buttons.append("<button class='deleteButton' id=" + place.id + ">Delete</button>");
}

function attachPlaceListeners() {
  $("ul#placeNames").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    placeLog.deletePlace(this.id);
    $(".show-places").hide();
    displayPlaceDetails(placeLog);
  });
}

$(document).ready(function() {
  attachPlaceListeners();
  $("#formOne").submit(function(event) {
    event.preventDefault();
    const inputtedName = $("#new-name").val();
    const inputtedLandmark = $("#new-landmark").val();
    const inputtedLocation = $("#new-location").val();
    const inputtedNotes = $("#new-notes").val();

    let newPlace = new Places(inputtedName, inputtedLandmark, inputtedLocation, inputtedNotes);
    placeLog.addPlace(newPlace);
    displayPlaceDetails(placeLog);
  });
});
