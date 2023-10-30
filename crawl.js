const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  let mainURL = new URL(url);
  let fullPath = `${mainURL.host}${mainURL.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return url;
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

async function crawlPage(baseURL, currentURL, pages) {
  let base = new URL(baseURL);
  let curr = new URL(currentURL);

  if (base.hostname !== curr.hostname) {
    return pages;
  }

  let normalCurr = normalizeURL(currentURL);

  if (pages[normalCurr] > 0) {
    pages[normalCurr]++;
    return pages;
  }

  if (currentURL === baseURL) {
    pages[normalCurr] = 0;
  } else {
    pages[normalCurr] = 1;
  }

  console.log(`Trying site: ${normalCurr}`);
  let text = "";
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return pages;
    }
    text = await resp.text();
  } catch (error) {
    console.log(`Failed with error: ${error.message}`);
  }

  const urls = getURLsFromHTML(text, baseURL);
  for (const url of urls) {
    pages = await crawlPage(baseURL, url, pages);
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
