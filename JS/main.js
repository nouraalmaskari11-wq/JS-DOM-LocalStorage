let userEmail = document.querySelector("#useremail");
let userPass = document.querySelector("#userpass");
let logbtn = document.querySelector("#logbtn");
let errMess = document.querySelector("#errMess");
let succMess = document.querySelector("#succMess");
let formLogin = document.querySelector("#logform form");

let quizSection = document.querySelector("#quizSection");
let quizForm = document.querySelector("#quizForm");
let numInput = document.querySelector("#num");
let startBtn = document.querySelector("#startQuizBtn");
let quizContainer = document.querySelector("#quiz");
let submitBtn = document.querySelector("#submitAnswer");
let resultHTML = document.querySelector("#result");
let logoutBtn = document.querySelector("#logoutBtn");

let operations = ["+", "-", "*", "/"];
let questions = [];



window.addEventListener("load", () => {
    if (localStorage.getItem("IsLogin") === "true") {
        quizSection.classList.replace("d-none", "d-block");
        formLogin.parentElement.classList.add("d-none");
        console.log("User still logged in");
    }
});




logbtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Login Attempt:", userEmail.value, userPass.value);

    if (userEmail.value !== "noura@gmail.com" || userPass.value !== "1234") {
        errMess.classList.replace("d-none", "d-block");
        succMess.classList.replace("d-block", "d-none");
    } else {
        errMess.classList.replace("d-block", "d-none");
        succMess.classList.replace("d-none", "d-block");
        console.log("Login Successful");
        localStorage.setItem("IsLogin", "true");

        setTimeout(() => {
            quizSection.classList.replace("d-none", "d-block");
            formLogin.parentElement.classList.add("d-none");
        }, 500);
    }
});



startBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let number = parseInt(numInput.value);
    console.log("Number of Questions:", number);

    if (!number || number <= 0) {
        alert("Enter a valid number");
        return;
    }
    if (number > 10) number = 10;

    questions = [];
    quizContainer.innerHTML = "";
    resultHTML.innerHTML = "";

    for (let i = 0; i < number; i++) {
        let num1 = Math.floor(Math.random() * 20) + 1;
        let num2 = Math.floor(Math.random() * 20) + 1;

        let op = operations[Math.floor(Math.random() * operations.length)];
        let correctAnswer;

        if (op === "+") correctAnswer = num1 + num2;
        if (op === "-") correctAnswer = num1 - num2;
        if (op === "*") correctAnswer = num1 * num2;
        if (op === "/") correctAnswer = num1 / num2;
        

        questions.push({ question: `${num1} ${op} ${num2}`, answer: correctAnswer });

        quizContainer.innerHTML += `
            <div class="mb-3">
                <label>${i + 1}) ${num1} ${op} ${num2} = ?</label>
                <input type="number" class="form-control answer">
            </div>
        `;
    }

    submitBtn.classList.remove("d-none");
});





submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let answers = document.querySelectorAll(".answer");
    let score = 0;

    console.log("Number of Questions:", questions.length);

    for (let i = 0; i < answers.length; i++) {
        console.log("Question:", questions[i].question);
        console.log("User Answer:", answers[i].value);

        if (+(answers[i].value) === questions[i].answer) {
            score++;
        }
    }

    console.log("Final Result:", score, "/", questions.length);
    resultHTML.innerHTML = `Your Result: ${score} / ${questions.length}`;
});





logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("IsLogin");
    quizSection.classList.replace("d-block", "d-none");
    formLogin.parentElement.classList.remove("d-none");
    quizContainer.innerHTML = "";
    submitBtn.classList.add("d-none");
    resultHTML.innerHTML = "";

    succMess.classList.replace("d-block", "d-none");
    errMess.classList.replace("d-block", "d-none");


    console.log("back to login");
});