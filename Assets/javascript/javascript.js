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

  	console.log(newTrain.trainName());
  	console.log(newTrain.trainDestination());
  	console.log(newTrain.arrivalTime());
  	console.log(newTrain.arrivalFrequency());

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

  	var firstTime = moment(arrivalTime, "hh:mm").subtract(1, "years");

  	var diffTime = moment().diff(moment(firstTime), "minutes");

  	var tRemainder = diffTime % arrivalFrequency;

  	var tMinutesTilTrain = arrivalFrequency - tRemainder;

  	var nextTrain = moment().add(tMinutesTilTrain, "minutes");

  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  arrivalFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTilTrain +"</td></tr>");
  });
