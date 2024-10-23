const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navbar ul");
const categories = document.querySelectorAll(".category");
const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");


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



