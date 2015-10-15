$(document).ready(function(){

  // Establish Global variables
  var answer = randomAnswer();
  var guessCounter = 0;
  var currentGuess = null;
  var distanceNumber = null;
  console.log(answer);
  
  // Function to choose a random number
  function randomAnswer() {
    var randStart = 1;
    var randEnd = 100;
    var answer = Math.floor(Math.random() * ((randEnd - randStart) + 1) + randStart);
    return answer;
  }

  // Function to clear the guess form
  function clearGuessForm() {
    $("#guessForm").find("input").val("");
  }

  // Function to reset the guess list
  function resetGuessList() {
    // Remove existing guess list
    $(".guessList").find("li").remove();

    // Add fresh guess list
    for (var i = 1; i <= 5; i++) {
      $(".guessList").find("ul").append('<li class="fadeGuess">Guess #' + i + '</li>');
    }
  }

  // Function to clear the picture area
  function removeImage() {
    $("#guessImage").find("img").remove();
  }

  // Function to clear the indicator
  function clearIndicator() {
    $(".closeIndicator").find("p").remove();
  }

  // Function to start a new game
  function newGame() {
    // Reset form, guess list, etc
    clearGuessForm();
    resetGuessList();
    clearIndicator();
    removeImage();
    // Generate a new answer
    answer = randomAnswer();
    // Reset the guess counter
    guessCounter = 0;
    currentGuess = null;
    console.log(answer);
  }

  // Function to reveal the answer when the user gives up
  function giveUp() {
    indicatorText("You give up too easy... the answer was " + answer + "!!!");
  }

  // Function to update the guess list
  function updateGuessList(currentGuess, guessCounter) {
    var guessString = "<li>Guess #" + guessCounter + " = " + currentGuess + "</li>";
    $(".guessList").find(".fadeGuess").first().after(guessString);
    $(".guessList").find(".fadeGuess").first().removeClass("fadeGuess").hide();
  }

  // Function to determine the distance and direction of the indicator
  function hotColdIndicator(currentGuess) {
    // Determine distance from the answer
    var distance = (currentGuess - answer);
    // Determine whterh the guess is hot or cold
    var hotOrCold = function() {
      if (distance >= 40 || distance <= -40) {
        return "ice cold";
      } else if (distance >= 20 || distance <= -20) {
        return "cold";
      } else if (distance >= 10 || distance <= -10) {
        return "hot";
      } else if (distance >= 5 || distance <= -5) {
        return "red hot";
      } else if (distance >= 1 || distance <= -1) {
        return "red hot";
      }
        else {
        return "CORRECT!!!";
      }
    };

    // Determine whether the next guess should be higher or lower
    var direction = function() {
      if (distance > 0) {
        return "Guess lower!";
      } else if (distance < 0) {
        return "Guess higher!";
      } else {
        return "Thanks for playing!";
      }
    };

    // Build an indicator message
    var message = "You are " + hotOrCold() + "! " + direction();

    // Send the appropriate indicator message
    if (guessCounter === 5 && currentGuess != answer) {
      indicatorText("You are out of guesses, the answer was " + answer + "!!!");
    } else {
      indicatorText(message, hotOrCold());
    }
  }

  // Function to flash the hot / cold text on the screen
  function indicatorText(message, hotColdClass) {
    clearIndicator();
    $(".closeIndicator").append("<p>" + message + "</p>");
    $(".closeIndicator").find("p").addClass(hotColdClass);
  }

  // Function to retrieve and validate guess from form field
  function getGuess() {
    var guess = +$("#guessForm").find("input").val();
    return guess;
  }

  // Function to update the image area based on a number (i.e. the guess or the answer)
  function imagePlacer(imageNum) {
    var imagePath = '<img src="./images/Jets-' + imageNum + '.jpeg">';
    $("#guessImage").append(imagePath);
  }

  // Click event to handle guess submission when the "Submit" button is clicked
  $("#submitGuess").on("click", function() {
    // Check if the user already won or have no guesses left
    if (currentGuess === answer) {
      alert('You already won!\nClick "Start Over" to play again!');
    }
    else if (guessCounter >= 5) {
      alert('You have no guesses left!\nClick "Start Over" to try again!');
    } else {
      // Run getGuess to validate and store the guess
      currentGuess = getGuess();
      // Check that the guess is a number between 1-100
      if (currentGuess >= 1 && currentGuess <= 100) {
        console.log(currentGuess);
        // Advance guess counter
        guessCounter++;
        console.log(guessCounter);
        // Update guess list
        updateGuessList(currentGuess, guessCounter);
        // Check how close the guess is to the correct answer
        hotColdIndicator(currentGuess);
        // Show an image of the number that was guessed
        removeImage();
        imagePlacer(currentGuess);
      }
      else {
        alert("Invalid guess. Please enter a number from 1-100");
      }

      // Clear guess form
      clearGuessForm();
    }
  });

  // Click event to start a new game when the "Start over" button is clicked
  $("#startOver").on("click", function() {
    newGame();
  });

  // Click event to reveal the answer when the "Give up" button is clicked
  $("#giveUp").on("click", function() {
    // Check if the user already won or have no guesses left
    if (currentGuess === answer) {
      alert("You can't give up because you won!" + '\nClick "Start Over" to play again!');
    }
    else if (guessCounter >= 5) {
      alert("You can't give up because you\n have no guesses left!" + '\n\nClick "Start Over" to try again!');
    } else {
      giveUp();
      guessCounter = 5;
      // Show an image of the number that was the answer
      removeImage();
      imagePlacer(answer);
    }
  });

});