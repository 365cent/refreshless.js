const cache = {};

document.addEventListener("click", async function (event) {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const page = event.target.href;
    let content = cache[page];
    if (!content) {
      const response = await fetch(page);
      content = await response.text();
      cache[page] = content;
    }
    document.body.innerHTML = content;
    window.history.pushState(page, null, page);
  }
});

addEventListener("popstate", (event) => {
    if (event.state) {
        document.body.innerHTML = cache[event.state];
    }
});
