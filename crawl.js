const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  let mainURL = new URL(url);
  let fullPath = `${mainURL.host}${mainURL.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

function getURLsFromHTML(html, rootURL) {
  let unNormalizedURLS = [];
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      try {
        unNormalizedURLS.push(new URL(link.href, rootURL).href);
      } catch (err) {
        console.log(`ERROR: ${err.message} ${link.href}`);
      }
    } else {
      try {
        unNormalizedURLS.push(new URL(link.href).href);
      } catch (err) {
        console.log(`ERROR: ${err.message} ${link.href}`);
      }
    }
  }
  return unNormalizedURLS;
}

async function crawlPage(url) {
  const html = await fetch(url);
  if (!html.headers.get("content-type").includes("text/html")) {
    console.log(`Error: Not HTML returned ${html.headers.get("content-type")}`);
  } else if (!html.ok) {
    console.log(`Error Status Code: ${html.status}`);
  } else {
    console.log(await html.text());
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
