document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById('content');

  // Laad eerst de intro pagina
  loadPage('pages/intro-page.html', 'css/intro.css');

  function loadPage(pageUrl, styleUrl) {
    // Oude dynamische stylesheet verwijderen (als aanwezig)
    const oldLink = document.querySelector('link[data-dynamic-style]');
    if (oldLink) oldLink.remove();

    // Nieuwe stylesheet toevoegen
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleUrl;
    link.setAttribute('data-dynamic-style', 'true');
    document.head.appendChild(link);

    // HTML inladen
    fetch(pageUrl)
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;

        // fade-in toepassen
        content.classList.remove('show'); // reset
        setTimeout(() => {
          content.classList.add('show');
        }, 50);

        // Als we op de intro zijn, maak hele scherm klikbaar
        if (pageUrl.includes('intro-page.html')) {
          const intro = document.getElementById('intro');
          intro.addEventListener('click', () => {
            // fade-out starten
            intro.classList.add('fade-out');

            // Wacht tot de animatie klaar is (0.8s)
            setTimeout(() => {
              loadPage('pages/home-page.html', 'css/home.css');
            }, 800);
          });
        }
      });
  }
});
