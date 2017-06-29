// Initialize Firebase
var config = {
    apiKey: "AIzaSyAW0InBVumxWDBqvPQpB-Vg0Iw5sR0ALZo",
    authDomain: "train-app-ebd41.firebaseapp.com",
    databaseURL: "https://train-app-ebd41.firebaseio.com",
    projectId: "train-app-ebd41",
    storageBucket: "train-app-ebd41.appspot.com",
    messagingSenderId: "980107186332"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainStart = moment($("#time-input").val().trim(),"HH:mm").subtract(1, "years").format("X");
  var trainFreq = $("#freq-input").val().trim();

  database.ref().push({
    name: trainName,
    destination: trainDes,
    start: trainStart,
    frequency: trainFreq
  });

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

});

// Firebase event for adding train schedule to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Stores everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  var differenceTimes = moment().diff(moment.unix(trainStart), "minutes");
  var tRemainder = moment().diff(moment.unix(trainStart), "minutes") % trainFreq ;
  var tMinutes = trainFreq - tRemainder;

  // Calculates the arrival time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 


  // Adds train data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" +
  trainFreq + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td><td>");

});

