const { argv } = require("node:process");
const { crawlPage } = require("./crawl");

function main() {
  if (argv.length < 3 || argv.length > 3) {
    console.log("Error, too few or too many arguemnets");
  } else {
    console.log(`Running Crawler with baseURL: ${argv[2]}`);
    crawlPage(argv[2]);
  }
}

main();
