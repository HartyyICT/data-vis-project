document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Navbar laden
  loadNavbar();

  // Eerste pagina die je wilt laden
  loadPage("pages/home-page.html", "css/home.css");

  // script om pagina's in te laden
  function loadPage(pageUrl, styleUrl) {
    // Oude stylesheet verwijderen
    const oldLink = document.querySelector("link[data-dynamic-style]");
    if (oldLink) oldLink.remove();

    // Nieuwe stylesheet toevoegen
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = styleUrl;
    link.setAttribute("data-dynamic-style", "true");
    document.head.appendChild(link);

    // HTML inladen
    fetch(pageUrl)
      .then(res => res.text())
      .then(data => {
        content.innerHTML = data;
      });
  }

  // navbar script om in te laden
  function loadNavbar() {
    if (!document.getElementById("navbar")) {
      fetch("pages/navbar.html")
        .then(res => res.text())
        .then(data => {
          const navContainer = document.createElement("div");
          navContainer.innerHTML = data;
          document.body.prepend(navContainer);

          // Navbar CSS toevoegen
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "css/navbar.css";
          document.head.appendChild(link);

          // Event listener voor Home
          const navHome = document.getElementById("nav-home");
          if (navHome) {
            navHome.addEventListener("click", (e) => {
              e.preventDefault();
              loadPage("pages/home-page.html", "css/home.css");
            });
          }
        });
    }
  }
});
