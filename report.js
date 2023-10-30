function report(pages) {
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
}

function sortPages(pages) {
  const sortedPages = Object.entries(pages);
  sortedPages.sort((pageA, pageB) => {
    return pageB[1] - pageA[1];
  });
  return sortedPages;
}

module.exports = { report };
