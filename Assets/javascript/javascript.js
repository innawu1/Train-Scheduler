$(document).ready(function(){
//Firebase config
var config = {
    apiKey: "AIzaSyAmuZOd-1PTVfEqG2Gpz2SYSQuaxkLS5mw",
    authDomain: "train-scheduler-database-8f38d.firebaseapp.com",
    databaseURL: "https://train-scheduler-database-8f38d.firebaseio.com",
    projectId: "train-scheduler-database-8f38d",
    storageBucket: "train-scheduler-database-8f38d.appspot.com",
    messagingSenderId: "315763182414"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var arrivalTime = $("#time-input").val().trim();
  	var arrivalFrequency = $("#frequency-input").val().trim();

  	var newTrain = {
  		train: trainName,
  		destination: trainDestination,
  		arrival: arrivalTime,
  		frequency: arrivalFrequency
  	};

  	database.ref().push(newTrain);

  	console.log(newTrain.train);
  	console.log(newTrain.destination);
  	console.log(newTrain.arrival);
  	console.log(newTrain.frequency);

  	 $("#train-name-input").val("");
  	 $("#destination-input").val("");
  	 $("#time-input").val("");
  	 $("#frequency-input").val("");
  });

//Firebase event for adding trains to the database and a new row to the table
  database.ref().on("child_added", function(childSnapshot, prevChildKey){

  	var trainName = childSnapshot.val().train;
  	var trainDestination = childSnapshot.val().destination;
  	var arrivalTime = childSnapshot.val().arrival;
  	var arrivalFrequency = childSnapshot.val().frequency;

  	// First Time (pushed back 1 year to make sure it comes before current time)
  	var firstTime = moment(arrivalTime, "hh:mm").subtract(1, "years");
  	
  	// Difference between the times
  	var diffTime = moment().diff(moment(firstTime), "minutes");

  	// Time apart (remainder)
  	var tRemainder = diffTime % arrivalFrequency;

  	// Minute Until Train
  	var tMinutesTilTrain = arrivalFrequency - tRemainder;

  	// Next Train
  	var nextTrain = moment(moment().add(tMinutesTilTrain, "minutes")).format("hh:mm A");


  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  		arrivalFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTilTrain +"</td></tr>");
  });

});