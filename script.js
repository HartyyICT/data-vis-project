document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Navbar laden
  loadNavbar();

  // Eerste pagina die je wilt laden
  loadPage("pages/home-page.html", "css/home.css");

  // Functie om pagina's dynamisch te laden
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

  // Navbar inladen
  function loadNavbar() {
    if (!document.getElementById("navbar")) {
      fetch("pages/navbar.html")
        .then(res => res.text())
        .then(data => {
          const navContainer = document.createElement("div");
          navContainer.innerHTML = data;
          document.body.prepend(navContainer);

          // Navbar CSS toevoegen (eenmalig)
          if (!document.querySelector('link[href="css/navbar.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "css/navbar.css";
            document.head.appendChild(link);
          }

          // Event listeners koppelen
          setupNavbarListeners();
        });
    }
  }

  // Event listeners voor navigatie
  function setupNavbarListeners() {
    const navHome = document.getElementById("nav-home");
    if (navHome) {
      navHome.addEventListener("click", (e) => {
        e.preventDefault();
        loadPage("pages/home-page.html", "css/home.css");
      });
    }

    const navAbout = document.getElementById("nav-about");
    if (navAbout) {
      navAbout.addEventListener("click", (e) => {
        e.preventDefault();
        loadPage("pages/about-me-page.html", "css/about-me.css");
      });
    }

    const navProjects = document.getElementById("nav-projects");
    if (navProjects) {
      navProjects.addEventListener("click", (e) => {
        e.preventDefault();
        loadPage("pages/projects.html", "css/projects.css");
      });
    }

    const navContact = document.getElementById("nav-contact");
    if (navContact) {
      navContact.addEventListener("click", (e) => {
        e.preventDefault();
        loadPage("pages/contact.html", "css/contact.css");
      });
    }
  }
});
