const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navbar ul");
let countSpan = document.querySelector(".count .count-num");
let bulletSpans = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answeredArea = document.querySelector(".answered-area");
let currentIndex = 0;

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");

  console.log("navList classes:", navList.classList);
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