import "dotenv/config";
import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

import mongoose from "mongoose";

const mongoString =
  "mongodb+srv://geoffrey:geo1112@maindb.eybrpdr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());
app.use(cors());

const browser = await puppeteer.launch({
  headless: false,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const sites = {
  amazon: {
    url: "https://www.amazon.in/",
  },
  flipkart: {
    url: "https://www.flipkart.com/",
  },
  snapdeal: {
    url: "https://www.snapdeal.com/",
  },
};

const getAmazonInfo = async (product, category) => {
  const page = await browser.newPage();
  const r = await page.goto(sites["amazon"].url);

  if (!r.ok()) {
    console.log("Error in opening Amazon");
    return [];
  }

  await page.type("#twotabsearchtextbox", product + " " + category);

  await page.click("#nav-search-submit-button");

  await page.waitForNavigation();

  const data = await page.evaluate(() => {
    const ele = document.querySelector(
      "#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t1.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section"
    );
    const productsLength = ele.children.item(0).children.length;
    const startLength = 6;

    const data = [];

    for (let i = startLength; i < productsLength; i++) {
      const name = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a > span"
        )?.innerHTML;

      const price = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span > span:nth-child(2) > span.a-price-whole"
        )?.innerHTML;

      const rating = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.a-spacing-top-micro > div > span:nth-child(1) > span.a-size-base.puis-bold-weight-text"
        )?.innerHTML;

      const noOfRatings = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.a-spacing-top-micro > div > span:nth-child(2) > a > span"
        )?.innerHTML;
      data.push({
        name,
        price,
        rating,
        noOfRatings,
      });
    }
    return data;
  });

  await page.close();

  console.log(data);

  return data;
};
const getFlipkartInfo = async (product, category) => {};
const getSnapdealInfo = async (product, category) => {};

app.post("/get-info", async (req, res) => {
  const { product, category } = req.body;
  let amazonData = await getAmazonInfo(product, category);
  amazonData = amazonData.filter((item) => {
    if (Object.keys(item).length === 0 && item.constructor === Object) {
      return false;
    }
    return true;
  });
  const data = amazonData.map((item) => {
    item.website = "amazon";
    return item;
  });
  if (data.length === 0) {
    res.json({ data: [] });
    return;
  }
  await database.collection("products").insertMany(data);
  res.json({ data });
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
