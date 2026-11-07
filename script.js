const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) return;

  results.innerHTML =
    '<p class="loading">Recherche en cours...</p>';

  try {
    const url =
      "https://fr.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: query,
        format: "json",
        origin: "*",
        srlimit: "10"
      });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur réseau");
    }

    const data = await response.json();
    const articles = data.query.search;

    if (articles.length === 0) {
      results.innerHTML =
        '<p class="error">Aucun résultat trouvé.</p>';
      return;
    }

    results.innerHTML = `
      <h3>${articles.length} résultats trouvés</h3>
    `;

    articles.forEach(article => {
      const item = document.createElement("article");
      item.className = "result-item";

      const link = document.createElement("a");
      link.href =
        "https://fr.wikipedia.org/wiki/" +
        encodeURIComponent(article.title.replace(/ /g, "_"));
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = article.title;

      const source = document.createElement("div");
      source.className = "source";
      source.textContent = "Wikipédia · Français";

      const description = document.createElement("p");
      description.textContent = article.snippet
        .replace(/<[^>]*>/g, "")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

      item.append(source, link, description);
      results.appendChild(item);
    });

  } catch (error) {
    results.innerHTML =
      '<p class="error">Impossible de charger les résultats. Réessaie.</p>';
  }
});
