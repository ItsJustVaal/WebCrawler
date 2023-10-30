const { crawlPage } = require("./crawl");

async function main() {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log("Error, too few or too many arguemnets");
  }
  const baseURL = process.argv[2];
  console.log(`Starting with: ${baseURL}`);
  pages = await crawlPage(baseURL, baseURL, {});
  console.log(pages);
}

main();

// "https://wagslane.dev"
