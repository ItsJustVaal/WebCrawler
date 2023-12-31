const { crawlPage } = require("./crawl");
const { report } = require("./report");

async function main() {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log("Error, too few or too many arguemnets");
  }
  const baseURL = process.argv[2];
  console.log(`Starting with: ${baseURL}`);
  pages = await crawlPage(baseURL, baseURL, {});
  report(pages);
}

main();

// test site "https://wagslane.dev"
