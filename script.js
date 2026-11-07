const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (query) {
    const url = "https://www.bing.com/search?q="
      + encodeURIComponent(query);

    window.location.href = url;
  }
});
