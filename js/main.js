window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  const logoContainer = document.getElementById("logo-container");
  const navList = document.querySelector(".nav-list");
  if (window.scrollY > window.innerHeight - 50) {
    header.style.background = "url('images/header-background.jpg') bottom / cover no-repeat";
    logoContainer.style.margin = "0 0 0 3rem";
    navList.querySelectorAll("a").forEach((a) => (a.style.color = "#222"));
  } else {
    header.style.background = "transparent";
    logoContainer.style.margin = "1rem 0 0 5rem";
    navList.querySelectorAll("a").forEach((a) => (a.style.color = "#fff"));
  }
});
