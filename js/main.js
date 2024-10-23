const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navbar ul");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");

  console.log("navList classes:", navList.classList);
});
