var quizQuestions = [];
var currentIndex = -1;
var seconds = 120;
var hasUserFinishedQuiz = false;

$("#startButton").on("click", function () {
  startTestTimer();

  quizQuestions = getQuizQuestions();
  nextQuestion();

  $(this).hide();

  $("#timerlabel").removeClass('d-none');
  $("#restoreInput").removeClass('d-none');
  $("#nextbutton").removeClass("d-none");
});


$("#nextbutton").on('click', function () {

  $("#wrong").addClass('d-none');
  $("#correct").addClass('d-none');

  nextQuestion();
});

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizQuestions.length) {
    var nextQuestion = quizQuestions[currentIndex];
    showQuestion(nextQuestion);
    listenToAnswerSelectionEvent();
  }
  else {
    hasUserFinishedQuiz = true;
    showResults(false);
  }
}


function listenToAnswerSelectionEvent() {

  $("input").on("click", function () {

    var selectedAnswer = $("input:checked").val();
    var currenQuestion = quizQuestions[currentIndex];

    if (currenQuestion.Answer == selectedAnswer) {
      currenQuestion.IsUserCorrect = true;
      $("#correct").removeClass('d-none');
    }
    else {
      currenQuestion.IsUserCorrect = false;
      $("#wrong").removeClass('d-none');
      seconds -= 10;
    }

    $("input:radio").prop('disabled', true);
  });
}

function showQuestion(quizQuestion) {
  var quizQuestionHtml = '<div class="row"><div class="col-md-12">' + quizQuestion.Question + '</div></div>';
  quizQuestionHtml += '<div class="row"><div class="col-md-12"><ol type="a">';

  for (var option of quizQuestion.Options) {
    quizQuestionHtml += '<li><input type="radio" value ="' + option + '" name="option"> ' + option + '</li>';
  }

  quizQuestionHtml += '</ol></div></div>';

  $("#currentquestion").html(quizQuestionHtml);
}

function showResults(showTimeUp) {

  var totalScore = 0;

  for (var question of quizQuestions) {
    if (question.IsUserCorrect)
      totalScore += 1;
  }

  var resultHtml = '<div class="row text-center">';
  resultHtml += '<div class="col-md-12">';

  if (showTimeUp) {
    resultHtml += '<span id="timeUp"><h1>Time up</h1></span>';
  }

  resultHtml += '</div></div>';

  resultHtml += '<div class="row text-center"> <div class="col-md-12"><span id="quizOver"> <h1>Quiz Over</h1></span></div></div>';
  resultHtml += '<div class="row text-center"><div class="col-md-12"><span id="totalScore">Total score: </span>';
  resultHtml += '<span>' + totalScore + ' out of ' + quizQuestions.length + '</span>';
  resultHtml += '</div> </div>';
  resultHtml += '<div class="row "><div class="col-md-12 d-flex justify-content-center"><div class="form-group form-inline">';
  resultHtml += '<label for="inputInitial">Enter Initials:</label><input type="text" id="inputInitial" class="form-control"';
  resultHtml += '></div><button class="btn btn-primary">Submit</button></div></div>';

  $("#maincontainer").html(resultHtml);

  $("Button").on("click", function () { processHighScores(totalScore) });

}

function processHighScores(totalScore) {
  var initials = $("#inputInitial").val();
  if(initials != ''){
    var existingScoresStorageItem = localStorage.getItem(initials);

  var highScore;

  if (existingScoresStorageItem != null)
    highScore = Number(existingScoresStorageItem);
  else
    highScore = 0;


  if (totalScore > highScore) {
    localStorage.setItem(initials, totalScore);
    highScore = totalScore;
  }

  showHighScores(initials, highScore);
  }else{
    alert("Enter a value for initials");
  }
  
}

function showHighScores(initials, highScore) {
  var highScoreHtml = '<div class="row"><div class="col-md-12 d-flex justify-content-center"> High Score for ' + initials + '</div></div>';
  highScoreHtml += '<div class="row"><div class="col-md-12 d-flex justify-content-center">' + highScore + '</div></div>';
  highScoreHtml += '<div class="row"><div class="col-md-12 d-flex justify-content-center"> <button class="btn btn-primary mb-2">Start Over</button></div></div>';


  $("#maincontainer").html(highScoreHtml);
  $("Button").on("click", function () { location.reload() });
}

var interval;

function startTestTimer() {

  updateTimer();

  interval = setInterval(function () {
    updateTimer();
  }, 1000);
}

function updateTimer() {
  seconds -= 1;
  if (seconds < 0) {
    clearInterval(interval);

    if (!hasUserFinishedQuiz)
      showResults(true);
  }
  else {
    var minutes = Math.floor(seconds / 60);
    var secondsToDisplay = seconds - (minutes * 60);

    $("#countDown").html(minutes + " : " + secondsToDisplay.toString().padStart(2,'0'));
  }

  return seconds;
}