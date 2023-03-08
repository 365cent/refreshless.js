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

    updatePage(content);
    window.history.pushState(page, "", page);
  }
});

addEventListener("popstate", (event) => {
  const page = event.state;
  const content = cache[page];
  if(event.state) {
    updatePage(content);
  }
});

function updatePage(content) {
   const newDoc = new DOMParser().parseFromString(content, "text/html");
   document.documentElement.replaceWith(newDoc.documentElement);
}
