$("#okButton").click(function () {

    var passwordlength = $("#passwordlength").val();
    var isNumericChecked = $("#numeric").is(":checked");
    var isUpperCase = $("#uppercase").is(":checked");
    var isLowerCase = $("#lowercase").is(":checked");
    var isSpecialCharacters = $("#specialcharacters").is(":checked");

    if (areInputsValid(passwordlength, isNumericChecked, isUpperCase,  isLowerCase, isSpecialCharacters)) {
       
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var specialCharacters = ["!", "@", "#", "&", "*", "/", "{", "}", "(", "%", "+", ".", "?"];

        var characters = [];

        if (isNumericChecked) {
            characters = characters.concat(numbers);
        }
        if (isUpperCase) {
            characters = characters.concat(uppercase);
        }
        if (isLowerCase) {
            characters = characters.concat(lowercase);
        }
        if (isSpecialCharacters) {
            characters = characters.concat(specialCharacters);
        }

        var password = "";

        for (var i = 0; i < passwordlength; i++) {
            var indexOfCharacter = Math.floor(Math.random() * characters.length);
            password += characters[indexOfCharacter];
        }

        $("#password").val(password);
    }
   
    reset();
});

function areInputsValid(passwordlength, isNumericChecked, isUpperCase,  isLowerCase, isSpecialCharacters) {

    var areInputsValid = false;

    if(passwordlength == ''){
      alert("Please enter password length");
    }
    else if (isNaN(passwordlength)) {
        alert("Please enter a number");
    }
    else if (passwordlength < 8 || passwordlength > 128) {
        alert("Please enter a number between 8 and 128");
    }
    else if (!(isNumericChecked || isUpperCase || isLowerCase || isSpecialCharacters)) { //De Morgan's rule
        alert("Select at least one character type option");
    }
    else {
        areInputsValid = true;
    }

    return areInputsValid;
}

function reset() {
    $("#passwordlength").val("");
    $("#numeric").prop("checked", false);
    $("#uppercase").prop("checked", false);
    $("#lowercase").prop("checked", false);
    $("#specialcharacters").prop("checked", false);
}
