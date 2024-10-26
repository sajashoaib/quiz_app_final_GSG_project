const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navbar ul");
const categories = document.querySelectorAll(".category");
const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");

let countSpan = document.querySelector(".count .count-num");
let bulletSpans = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answeredArea = document.querySelector(".answered-area");
let currentIndex = 0;

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");

  console.log("navList classes:", navList.classList);
});

categories.forEach((category) => {
  category.addEventListener("click", () => {
    categories.forEach((cat) => cat.classList.remove("selected"));
    category.classList.add("selected");
    const selectedText = category.querySelector("span").textContent;
    localStorage.setItem("selectedCategory", selectedText);
  });
});

function showAlert() {
  Swal.fire({
    title:
      '<h2 style="color: #3a2ade; margin-bottom: 10px;">Quiz Instructions</h2>',
    html: `
<ul style="text-align: left; font-size: 18px; line-height: 1.6; color: #6356e5;">
<li>Read all questions carefully before answering.</li>
<li>You have <strong>10 minutes</strong> to complete the quiz.</li>
<li>There is no second attempt unless your score is less than <strong>5</strong>.</li>
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
window.location.href = 'personal_info.html';
}
});
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "You have already taken the quiz.",
        confirmButtonText: "OK"
      });
    } else {
      existingUsers.push({ name, email });
      localStorage.setItem("users", JSON.stringify(existingUsers));
      window.location.href = "quize.html";
    }
  }
});




categories.forEach((category) => {
  category.addEventListener("click", () => {
    categories.forEach((cat) => cat.classList.remove("selected"));
    category.classList.add("selected");
    const selectedText = category.querySelector("span").textContent;
    localStorage.setItem("selectedCategory", selectedText);
  });
});

function showAlert() {
  Swal.fire({
    title:
      '<h2 style="color: #3a2ade; margin-bottom: 10px;">Quiz Instructions</h2>',
    html: `
<ul style="text-align: left; font-size: 18px; line-height: 1.6; color: #6356e5;">
<li>Read all questions carefully before answering.</li>
<li>You have <strong>10 minutes</strong> to complete the quiz.</li>
<li>There is no second attempt unless your score is less than <strong>5</strong>.</li>
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
window.location.href = 'personal_info.html';
}
});
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "You have already taken the quiz.",
        confirmButtonText: "OK"
      });
    } else {
      existingUsers.push({ name, email });
      localStorage.setItem("users", JSON.stringify(existingUsers));
      window.location.href = "quize.html";
    }
  }
});





function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.response)
        let myquestionsObject = JSON.parse(this.responseText);
        // let quizeQuestions = myquestionsObject.categories.HTML;
        let myquestionNumbers = myquestionsObject.length;
              console.log("Number of HTML questions:", myquestionNumbers);
              createBullets(myquestionNumbers)
              questionsData(myquestionsObject[currentIndex], myquestionNumbers);

      }}
      myRequest.open("GET", "question_copy.json", true);
      myRequest.send();
  }
  getQuestions();


  function createBullets(num) {
    countSpan.innerHTML = num;
    // create bullets according the number of questions
    for (let i = 0; i < num; i++) {
        // create bullets elements
        let bullets = document.createElement("span");
        bulletSpans.appendChild(bullets);
        // if this first question the bullet take class on "class made in css for the color of span"
        if (i === 0) {
          bullets.className = "on";
        }}
  }
  function questionsData(obj, count) {
  if (currentIndex < count) {
    let questionName = document.createElement("h2");
    let questionTitle = document.createTextNode(obj["title"]);
    questionName.appendChild(questionTitle);
    quizArea.appendChild(questionName);

    for (let i = 1; i <= 4; i++) {
      let answer = document.createElement("div");
      answer.className = "answer";
      let inputRadio = document.createElement("input");
      inputRadio.type = "radio";
      inputRadio.id = `answer_${i}`;
      inputRadio.name = "questions";
      inputRadio.dataset.answer = obj[`answer_${i}`];

      if (i === 1) {
        inputRadio.checked = true; //to make first answer checked
      }

      let labelradio = document.createElement("label");
      labelradio.htmlFor = `answe_r${i}`;
      let labelradioText = document.createTextNode(obj[`answer_${i}`]);
      labelradio.appendChild(labelradioText);
      answer.appendChild(inputRadio);
      answer.appendChild(labelradio);
      answeredArea.appendChild(answer);
    }
  }
}