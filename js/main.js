const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navbar ul");
const categories = document.querySelectorAll(".category");
const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const emailInputSignUp = document.getElementById("email-sign-up");
const passwordInputSignUp = document.getElementById("password-sign-up");
const emailInputEditPassword = document.getElementById("email-forget-password");
const passwordInputEditPassword = document.getElementById(
  "password-forget-password"
);
const confirmpasswordInputEditPassword = document.getElementById(
  "confirmpassword-forget-password"
);
const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const emailErrorSignUp = document.getElementById("emailErrorSignUp");
const passwordErrorSignUp = document.getElementById("passwordErrorSignUp");
const emailErrorForgetPassword = document.getElementById(
  "emailErrorForgetPassword"
);
const passwordErrorForgetPassword = document.getElementById(
  "passwordErrorForgetPassword"
);
const confirmpasswordErrorForgetPassword = document.getElementById(
  "confirmpasswordErrorForget"
);
const sign_in_form = document.getElementById("sign-in-form");
const sign_up_form = document.getElementById("sign-up-form");
const edit_password_form = document.getElementById("edit-password-form");
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
const cameraIcon = document.getElementById("cameraIcon");
const profileImageHeader = document.getElementById("profileImageHeader");
const uploadProfileImage = document.getElementById("uploadProfileImage");
const name_user = document.getElementById("name-user");
const userNameinfo = document.getElementById("userNameinfo");
const userEmailinfo = document.getElementById("userEmailinfo");
const logoutBtn = document.getElementById("logoutBtn");
const smallprofileNameHeader = document.getElementById(
  "smallprofileNameHeader"
);
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^.{6,}$/;
let questions = {};
let rightAnswers = 0; // number of right answers in first be 0
let timercount; //to stop timer
let currentIndex = 0;
let profileImageData;
const defaultProfileImage = "imgs/person-create-cv.svg"; // default img

let currentDuration;
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

// ***************** validation for sign in form ***********************************

if (sign_in_form) {
  sign_in_form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    let isValid = true;

    // التحقق من صحة البريد الإلكتروني
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email.";
      isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // التحقق من صحة كلمة المرور
    if (passwordInput.value.trim() === "") {
      passwordError.textContent = "Please enter your password.";
      isValid = false;
    } else if (!passwordPattern.test(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 6 characters";
      isValid = false;
    }

    if (isValid) {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // التحقق من وجود المستخدم في LocalStorage
      const user = existingUsers.find((user) => user.email === email);

      if (!user) {
        // إذا لم يكن المستخدم موجودًا
        Swal.fire({
          icon: "info",
          title: "Registration Required",
          text: "Please sign up first",
          confirmButtonText: "OK",
        });
      } else if (user.password !== password) {
        // إذا كانت كلمة المرور غير مطابقة
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "The password you entered is incorrect. Please try again.",
          confirmButtonText: "OK",
        });
      } else {
        // إذا كان البريد الإلكتروني وكلمة المرور صحيحين
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Login successful.",
          confirmButtonText: "OK",
        }).then(() => {
          emailInput.value = "";
          passwordInput.value = "";
          window.location.href = "category_cards.html";
        });
      }
    }
  });
}

// ***************** logic of upload image ***********************************
if (cameraIcon) {
  cameraIcon.addEventListener("click", function () {
    uploadProfileImage.click();
  });
}
if (uploadProfileImage) {
  uploadProfileImage.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImageData = e.target.result;
        document.getElementById("profileImage").src = profileImageData;
        localStorage.setItem("profileImageData", profileImageData);
      };
      reader.readAsDataURL(file);
    }
  });
}

// ***************** validation for sign up form ***********************************

if (sign_up_form) {
  sign_up_form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailErrorSignUp.textContent = "";
    passwordErrorSignUp.textContent = "";
    nameError.textContent = "";
    let isValid = true;

    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    if (emailInputSignUp.value.trim() === "") {
      emailErrorSignUp.textContent = "Please enter your email.";
      isValid = false;
    } else if (!emailPattern.test(emailInputSignUp.value)) {
      emailErrorSignUp.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (passwordInputSignUp.value.trim() === "") {
      passwordErrorSignUp.textContent = "Please enter your password.";
      isValid = false;
    } else if (!passwordPattern.test(passwordInputSignUp.value)) {
      passwordErrorSignUp.textContent =
        "Password must be at least 6 characters";
      isValid = false;
    }

    if (isValid) {
      const name = nameInput.value.trim();
      const email = emailInputSignUp.value.trim();
      const password = passwordInputSignUp.value.trim();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = existingUsers.find((user) => user.email === email);

      if (user) {
        Swal.fire({
          icon: "warning",
          title: "User Already Exists",
          text: "You are already registered. Please log in.",
          confirmButtonText: "OK",
        });
      } else {
        // upload images to cloudinary becouse the size of images
        if (uploadProfileImage.files.length > 0) {
          const file = uploadProfileImage.files[0];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "images"); // upload preset Cloudinary

          fetch("https://api.cloudinary.com/v1_1/dmmmksqmh/image/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              const newUser = {
                name,
                email,
                password,
                profileImage: data.secure_url,
              };
              existingUsers.push(newUser);
              localStorage.setItem("loggedInUserEmail", email);
              localStorage.setItem("users", JSON.stringify(existingUsers));

              Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "Your account has been created. Please log in.",
                confirmButtonText: "OK",
              }).then(() => {
                nameInput.value = "";
                emailInputSignUp.value = "";
                passwordInputSignUp.value = "";
                window.location.href = "index.html";
              });
            })
            .catch((error) => {
              console.error("Error uploading to Cloudinary:", error);
            });
        } else {
          // when user doesnt upload image appear the default image
          const newUser = {
            name,
            email,
            password,
            profileImage: defaultProfileImage,
          };
          existingUsers.push(newUser);
          localStorage.setItem("loggedInUserEmail", email);
          localStorage.setItem("users", JSON.stringify(existingUsers));

          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Your account has been created. Please log in.",
            confirmButtonText: "OK",
          }).then(() => {
            nameInput.value = "";
            emailInputSignUp.value = "";
            passwordInputSignUp.value = "";
            window.location.href = "index.html";
          });
        }
      }
    }
  });
}

// ***************** display image from local storage according the gmail stored in local storage ***********************************

const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = savedUsers.find((user) => user.email === loggedInUserEmail);

if (currentUser) {
  if (profileImageHeader) {
    profileImageHeader.src = currentUser.profileImage || defaultProfileImage;
    profileImageHeader.addEventListener("click", function () {
      const profileContainer = this.closest(".profile-container");
      profileContainer.classList.toggle("active"); 
      if (userNameinfo) {
        userNameinfo.textContent = currentUser.name;
      }
      if (userEmailinfo) {
        userEmailinfo.textContent = currentUser.email;
      }
    });
  }
 
 } else {
  console.log("User not found.");
  if (profileImageHeader) {
    profileImageHeader.src = defaultProfileImage;
  }
}
 if (name_user) {
    name_user.textContent = currentUser.name;
  }
 if (smallprofileNameHeader) {
    smallprofileNameHeader.textContent = currentUser.name;
  }
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    window.location.href = "index.html";
    if (userNameinfo) {
      userNameinfo.textContent = "";
    }
    if (userEmailinfo) {
      userEmailinfo.textContent = "";
    }
  });
}

// ***************** validation for edit password form ***********************************
if (edit_password_form) {
  edit_password_form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailErrorForgetPassword.textContent = "";
    passwordErrorForgetPassword.textContent = "";
    confirmpasswordErrorForgetPassword.textContent = "";

    let isValid = true;

    if (emailInputEditPassword.value.trim() === "") {
      emailErrorForgetPassword.textContent = "Please enter your email.";
      isValid = false;
    } else if (!emailPattern.test(emailInputEditPassword.value)) {
      emailErrorForgetPassword.textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    if (passwordInputEditPassword.value.trim() === "") {
      passwordErrorForgetPassword.textContent = "Please enter your password.";
      isValid = false;
    } else if (!passwordPattern.test(passwordInputEditPassword.value)) {
      passwordErrorForgetPassword.textContent =
        "Password must be at least 6 characters";
      isValid = false;
    }

    if (confirmpasswordInputEditPassword.value.trim() === "") {
      confirmpasswordErrorForgetPassword.textContent =
        "Please confirm your password.";
      isValid = false;
    } else if (
      confirmpasswordInputEditPassword.value.trim() !==
      passwordInputEditPassword.value.trim()
    ) {
      confirmpasswordErrorForgetPassword.textContent =
        "Passwords do not match.";
      isValid = false;
    }

    if (isValid) {
      const email = emailInputEditPassword.value.trim();
      const newPassword = passwordInputEditPassword.value.trim();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = existingUsers.findIndex((user) => user.email === email);

      if (userIndex === -1) {
        Swal.fire({
          icon: "info",
          title: "User Not Found",
          text: "No account found with this email. Please sign up first.",
          confirmButtonText: "OK",
        });
      } else {
        existingUsers[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(existingUsers));
        Swal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Your password has been successfully updated.",
          confirmButtonText: "OK",
        }).then(() => {
          emailInputEditPassword.value = "";
          passwordInputEditPassword.value = "";
          confirmpasswordInputEditPassword.value = "";
          window.location.href = "index.html"; // الانتقال إلى صفحة تسجيل الدخول
        });
      }
    }
  });
}

// ***************** logic sweet alert  ***********************************

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
    confirmButtonColor: "#6356e5",
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

  myRequest.open(
    "GET",
    `https://sajashoaib.github.io/quiz_app_final_GSG_project/data/${category}.json`,
    true
  );

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
    results = `<span class="good">Good ${currentUser.name}, you're doing well! Keep going!</span>`;
    retrybtn.disabled = false;
  } else if (rightAnswers === totalQuestions) {
    results = `<span class="perfect">Perfect ${currentUser.name}, great job Keep it up!</span>`;
    retrybtn.disabled = false;
  } else {
    results = `<span class="bad">Bad ${currentUser.name}, don't give up! Try again!</span>`;
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
  currentDuration = duration;

  if (currentIndex < count) {
    startTimer();
  }
}

function startTimer() {
  timercount = setInterval(function () {
    let minutes = parseInt(currentDuration / 60);
    let seconds = parseInt(currentDuration % 60);

    //if number of minutes, secounds less than 10 add 0 before the number
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    countDown.innerHTML = `${minutes} : ${seconds}`;

    // if time less than 0 the timer stopped and move to score page
    if (--currentDuration < 0) {
      clearInterval(timercount);
      window.location.href = "score.html";
    }
  }, 1000);
}

// when there is no internet connection the timer stopped
window.addEventListener("offline", function () {
  clearInterval(timercount);
  submitanswer.disabled = true;
  submitanswer.style.backgroundColor = "#BEB7E3";
});

// when there is internet connection return the timer continue from the point stopped
window.addEventListener("online", function () {
  startTimer(currentDuration);
  submitanswer.disabled = false;
  submitanswer.style.backgroundColor = "";
});

//*********************  if user click on retry button will move to category cards ********************
if (retrybtn) {
  retrybtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "category_cards.html";
  });
}
