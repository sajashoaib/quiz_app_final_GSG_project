const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navbar ul");
const categories = document.querySelectorAll(".category");
const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
let quizArea = document.querySelector(".quiz-area");
let answeredArea = document.querySelector(".answered-area");
let countSpan = document.querySelector(".count .count-num");
let bullets = document.querySelector(".bullets");
let scoreElement = document.getElementById("score");
let resultMessageElement = document.getElementById("resultMessage");
let bulletSpans = document.querySelector(".bullets .spans");
let category_content = document.querySelector(".category-name");
let startbtn = document.querySelector(".start-btn");
let countDown = document.querySelector(".countdown div");
let retrybtn = document.getElementById("retry-btn");
const submitanswer = document.querySelector(".submit-answer");
let questions = {};
let rightAnswers = 0; // number of right answers in first be 0
let timercount; //to stop timer
let currentIndex = 0;

// ***************** when click on start button call showALert ***********************************
if (startbtn) {
    startbtn.addEventListener("click", () => {
        showAlert();
    });
}

// ***************** logic forr menua icon on small screen ***********************************
menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    console.log("navList classes:", navList.classList);
});

// ***************** logic for choose catogory and store it local storage to display questions according name of catogory *****************
categories.forEach((category) => {
    category.addEventListener("click", () => {
        categories.forEach((cat) => cat.classList.remove("selected"));
        category.classList.add("selected");
        const selectedText = category.querySelector("span").textContent;
        localStorage.setItem("selectedCategory", selectedText);
        getQuestions(selectedText); //call question according selected catogory
    });
});

// ***************** validation for inputs  of form in index file ***********************************
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (submitBtn) {
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";

        let isValid = true;

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (isValid) {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            const userExists = existingUsers.some((user) => user.email === email);

            if (userExists) {
                Swal.fire({
                    icon: "info",
                    title: "Oops!",
                    text: "You have already taken the quiz.",
                    confirmButtonText: "OK",
                });
            } else {
                existingUsers.push({ name, email });
                localStorage.setItem("users", JSON.stringify(existingUsers));
                window.location.href = "category_cards.html";
            }
        }
    });
}

function showAlert() {
    Swal.fire({
        title:
            '<h2 style="color: #3a2ade; margin-bottom: 10px;">Quiz Instructions</h2>',
        html: `
<ul style="text-align: left; font-size: 18px; line-height: 1.6; color: #6356e5;">
<li>Read all questions carefully before answering.</li>
<li>You have <strong>10 minutes</strong> to complete the quiz.</li>
<li>Do not refresh the page during the quiz.</li>
<li>Click the <strong>Submit</strong> button after finishing.</li>
</ul>
<p><strong>Good Luck</strong></p>
`,
        icon: "info",
        confirmButtonText: "Start Quiz",
        width: "600px",
        padding: "30px",
        background: "#f3f6f6",
        color: "#3a2ade",
        confirmButtonColor: "#8c82ec",
        customClass: {
            popup: "styled-popup",
            confirmButton: "styled-button",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "quize.html";
        }
    });
}

// ***************** function bring data from json files according selected cateogry***********************************

function getQuestions(category) {
    console.log("Fetching questions from:", category);
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let questionsObject = JSON.parse(this.responseText);
                if (!questionsObject || questionsObject.length === 0) {
                    console.error("No questions found.");
                    return;
                }
                localStorage.setItem(category, JSON.stringify(questionsObject));

                // store number of question in local storage
                localStorage.setItem(`${category}_count`, questionsObject.length);
                showAlert();
            } else {
                console.error("Error fetching questions:", this.status);
            }
        }
    };

        myRequest.open("GET", `https://sajashoaib.github.io/quiz_app_final_GSG_project/data/${category}.json`, true);


    myRequest.send();
}

// ***************** function create bullets according the number of questions ***********************************

function createBullets(num) {
    countSpan.innerHTML = num;
    for (let i = 0; i < num; i++) {
        // create bullets elements
        let bullets = document.createElement("span");
        bulletSpans.appendChild(bullets);
        // if this first question the bullet take class on "class made in css for the color of span"
        if (i === 0) {
            bullets.className = "on";
        }
    }
}

// ***************** function loops on bullets and compare current index with index to move class on to next bullet *******************
function handleBullets() {
    let bulletSpan = document.querySelectorAll(".bullets .spans span");
    //   create array by from and loop on spans
    let bulletArray = Array.from(bulletSpan);
    bulletArray.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

// ***************** function that display catogory name that stored in local storage when click on cateogry card in his area*******************
function displayCategoryName() {
    let selectedCategory =
        localStorage.getItem("selectedCategory") || "Unknown Category";
    let categoryname = document.createElement("span");
    let categorynametext = document.createTextNode(selectedCategory);
    categoryname.appendChild(categorynametext);

    if (category_content) {
        category_content.appendChild(categoryname);
    }
}
// ************************   if quize page display call get data function (it rsponsible for display questions) *********************
if (window.location.href.includes("quize.html")) {
    const category = localStorage.getItem("selectedCategory");
    getData(category);
}

// ************************   if score page display show result data function (it rsponsible for display right answers) *********************
if (window.location.href.includes("score.html")) {
    let rightAnswers = parseInt(localStorage.getItem("rightAnswers"), 10) || 0;
    let totalQuestions =
        parseInt(localStorage.getItem("totalQuestions"), 10) || 0;
    showResults(totalQuestions, rightAnswers);
}

// ******************* function get data and multiple things "there is comment for each line"  *********************************
function getData(category) {
    console.log("Fetching data from localStorage for:", category);
    let storedQuestions = localStorage.getItem(category);

    if (storedQuestions) {
        let questionsArray = JSON.parse(storedQuestions);
        shuffleArray(questionsArray);

        let questionCount = questionsArray.length;

        // display the current question
        questionsData(questionsArray[currentIndex], questionCount);
        createBullets(questionCount);
        displayCategoryName();
        timer(600, questionCount);
        submitanswer.onclick = function () {
            //  get right answer
            let rightAnswer = questionsArray[currentIndex].right_answer;
            console.log(rightAnswer);
            currentIndex++;

            checkAnswer(rightAnswer, questionCount);

            // check if this the last question
            if (currentIndex === questionCount) {
                localStorage.setItem("totalQuestions", questionCount);

                //  call storescores function that store right answer and number of question in local storage
                storeScores(rightAnswers, questionCount);
                window.location.href = "score.html";
            } else {
                // empty the question area to display new question
                quizArea.innerHTML = "";
                answeredArea.innerHTML = "";

                // to display new question with new current index after increased
                questionsData(questionsArray[currentIndex], questionCount);
                handleBullets();
            }
        };
    }
}

// ***************************** function that make shuffle for questions *************
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

//**************************   function that create title of question and answers and bring it from json files  ***************
function questionsData(obj, count) {
    // condition that  when arrive to last question doesnt appear error "current question less than number of questions "
    if (currentIndex < count) {
        if (!obj || typeof obj !== "object") {
            console.error("Invalid question object:", obj);
            return;
        }

        let questionName = document.createElement("h2");
        let questionTitle = document.createTextNode(obj["title"]);
        questionName.appendChild(questionTitle);

        if (quizArea) {
            quizArea.innerHTML = "";
            quizArea.appendChild(questionName);
        } else {
            console.error("Failed to find quiz area element");
        }

        if (answeredArea) {
            answeredArea.innerHTML = "";
            for (let i = 1; i <= 4; i++) {
                let answer = document.createElement("div");
                answer.className = "answer";
                let inputRadio = document.createElement("input");
                inputRadio.type = "radio";
                inputRadio.id = `answer_${i}`;
                inputRadio.name = "questions";
                inputRadio.dataset.answer = obj[`answer_${i}`];
                //  the first answer choosen by default
                if (i === 1) {
                    inputRadio.checked = true;
                }
                // create label of answers and get each answer from json  files
                let labelradio = document.createElement("label");
                labelradio.htmlFor = `answer_${i}`;
                let labelradioText = document.createTextNode(obj[`answer_${i}`]);
                labelradio.appendChild(labelradioText);
                answer.appendChild(inputRadio);
                answer.appendChild(labelradio);
                answeredArea.appendChild(answer);
            }
        }
    } else {
        console.log("All questions have been displayed.");
    }
}

// ****** function that compare right answer with choosen answer  and increase right answer to move next question **********
function checkAnswer(rightAnswer, questionNumbers) {
    // console.log(rightAnswer)
    // console.log(questionNumbers)
    let answers = document.getElementsByName("questions");
    let choosenAnswer;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            choosenAnswer = answers[i].dataset.answer;
        }
    }
    //  console.log(`right answer ${rightAnswer}`)
    //  console.log(`wrong answer ${choosenAnswer}`)
    if (rightAnswer === choosenAnswer) {
        rightAnswers++;
        console.log("good");
    }
    storeScores(rightAnswers, questionNumbers);
}

// ******** fuction that store right answers and number of question in local storge
function storeScores(rightAnswers, totalQuestions) {
    localStorage.setItem("rightAnswers", rightAnswers);
    localStorage.setItem("totalQuestions", totalQuestions);
}

// ****** logic of display results in score page
function showResults(totalQuestions, rightAnswers) {
    // update success score
    scoreElement.textContent = `${rightAnswers} / ${totalQuestions}`;
    let results;
    if (rightAnswers > totalQuestions / 2 && rightAnswers < totalQuestions) {
        results = `<span class="good">Good</span>`;
        retrybtn.disabled = false;
    } else if (rightAnswers === totalQuestions) {
        results = `<span class="perfect">Perfect</span>`;
        retrybtn.disabled = false;
    } else {
        results = `<span class="bad">Bad</span>`;
        retrybtn.disabled = false;
    }
    resultMessageElement.innerHTML = results;

    if (scoreElement) {
        scoreElement.style.display = "block";
    } else {
        console.error("scoreBox not found in the DOM.");
    }
}

// *********** function that set timer for all questions ******************
function timer(duration, count) {
    if (currentIndex < count) {
        let minutes, secounds;
        timercount = setInterval(function () {
            // to get number of minutes
            minutes = parseInt(duration / 60);
            // to get number of secounds by the modules of minutes
            secounds = parseInt(duration % 60);
            //if number of minutes, secounds less than 10 add 0 before the number
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            secounds = secounds < 10 ? `0${secounds}` : secounds;

            countDown.innerHTML = `${minutes} : ${secounds}`;
            // if time less than 0 the timer stopped and move to score page
            if (--duration < 0) {
                clearInterval(timercount);
                window.location.href = "score.html";
            }
        }, 1000);
    }
}

//*********************  if user click on retry button will move to category cards ********************
if (retrybtn) {
    retrybtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "category_cards.html";
    });
}
