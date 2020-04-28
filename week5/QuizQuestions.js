function QuizQuestion() {
}

QuizQuestion.prototype.Question = "";
QuizQuestion.prototype.Options = [];
QuizQuestion.prototype.Answer = "";
QuizQuestion.prototype.IsUserCorrect = false;


function getQuizQuestions() {

    var quizQuestionsArray = [];

    var question1 = createQuestion(" Q1.Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?'", ['charAt()', 'charCodeAt()', 'concat()', 'indexOf()'], 'charCodeAt()');
    quizQuestionsArray.push(question1);

    var question2 = createQuestion("Q2.Which of the following attribute can hold the JavaScript version?", ['LANGUAGE', 'SCRIPT', 'VERSION', 'None of the above'], 'LANGUAGE');
    quizQuestionsArray.push(question2);

    var question3 = createQuestion("Q3.JavaScript entities start with _______ and end with _________.", ['Semicolon,colon', 'Semicolon, Ampersand', 'Ampersand,colon', 'Ampersand, semicolon'], 'Ampersand, semicolon');
    quizQuestionsArray.push(question3);

    var question4 = createQuestion("Q4.Choose the server-side JavaScript object?", ['FileUpLoad', 'Function', 'File', 'Date'], 'File');
    quizQuestionsArray.push(question4);

    var question5 = createQuestion("Q5.Choose the client-side JavaScript object?", ['Database', 'Cursor', 'Client', 'FileUpLoad'], 'FileUpLoad');
    quizQuestionsArray.push(question5);

    var question6 = createQuestion("Q6.Which of the following is not considered a JavaScript operator?", ['new', 'this', 'delete', 'typeof'], 'this');
    quizQuestionsArray.push(question6);

    var question7 = createQuestion("Q7.Which of the following function of String object returns the index within the calling String object of the last occurrence of the specified value?", ['lastIndexOf()', 'search()', 'substr()', 'indexOf()'], 'lastIndexOf()');
    quizQuestionsArray.push(question7);

    var question8 = createQuestion("Q8.Can you pass a anonymous function as an argument to another function?", ['true', 'false'], 'true')
    quizQuestionsArray.push(question8);

    var question9 = createQuestion("Q9.Which of the following type of variable takes precedence over other if names are same?", ['global variable', 'local variable', 'Both of the above.', 'None of the above.'], 'local variable');
    quizQuestionsArray.push(question9);

    var question10 = createQuestion("Q10.Which built-in method reverses the order of the elements of an array?", ['changeOrder(order)', 'reverse()', 'sort(order)', 'None of the above.'], 'reverse()');
    quizQuestionsArray.push(question10);

    return quizQuestionsArray;
}

function createQuestion(question, options, answer) {
    var quizQuestion = new QuizQuestion();
    quizQuestion.Question = question;
    quizQuestion.Options = options,
    quizQuestion.Answer = answer;

    return quizQuestion;
}

