const yargs = require('yargs');
const cheerio = require('cheerio');
const { hideBin } = require('yargs/helpers');
const pupeteer = require('puppeteer');

// get arguments from CLI
const argv = yargs(hideBin(process.argv)).parse();
const { url, selector } = argv;

async function main() {
  const browser = await pupeteer.launch({
    browser: 'chrome'
  });
  const page = await browser.newPage();
  await page.goto(url);

  const page_html = await page.content();
  await browser.close();
  const $ = cheerio.load(page_html);
  const targetContent = $(selector).text();
  console.log(targetContent);
}

if (!url || !selector) {
  throw new Error('Please specify url and selector');
}

main();
