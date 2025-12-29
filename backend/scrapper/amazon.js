

const puppeteer = require("puppeteer");

async function getAmazonPrice(query) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
    { waitUntil: "domcontentloaded" }
  );

  const price = await page.evaluate(() => {
    const el = document.querySelector(".a-price-whole");
    return el ? el.innerText.replace(",", "") : null;
  });

  await browser.close();

  return {
    platform: "Amazon",
    price: price ? Number(price) : null,
    url: "https://www.amazon.in"
  };
}

module.exports = getAmazonPrice;
