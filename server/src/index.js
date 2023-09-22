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
  defaultViewport: { height: 1920, width: 1080 },
});

const sites = {
  amazon: {
    url: "https://www.amazon.in/",
  },
  flipkart: {
    url: "https://www.flipkart.com/search?q=",
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

  await page.waitForSelector("#twotabsearchtextbox", {
    visible: true,
  });

  await page.type("#twotabsearchtextbox", product + " " + category);

  await page.click("#nav-search-submit-button");

  await page.waitForNavigation();

  const data = await page.evaluate(() => {
    const ele = document.querySelector(
      "#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t1.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section",
    );
    const productsLength = ele.children.item(0).children.length;
    const startLength = 6;

    const data = [];

    for (let i = startLength; i < productsLength; i++) {
      const name = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a > span",
        )?.innerHTML;

      if (!name) {
        const name = ele.children
          .item(0)
          .children.item(i)
          .querySelector(
            "div > div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style > h2 > a > span",
          )?.innerHTML;

        const price = ele.children
          .item(0)
          .children.item(i)
          .querySelector(
            "div > div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > a > span > span:nth-child(2) > span.a-price-whole",
          )?.innerHTML;

        const rating = ele.children
          .item(0)
          .children.item(i)
          .querySelector(
            "div > div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div:nth-child(2) > div > span:nth-child(2) > a > span",
          )?.innerHTML;

        const noOfRatings = ele.children
          .item(0)
          .children.item(i)
          .querySelector(
            "div > div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div:nth-child(2) > div > span:nth-child(2) > a > span",
          )?.innerHTML;

        const link = ele.children
          .item(0)
          .children.item(i)
          .querySelector(
            "div > div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style > h2 > a",
          )?.href;

        data.push({
          name,
          price,
          rating,
          noOfRatings,
          link,
        });
        continue;
      }

      const price = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span > span:nth-child(2) > span.a-price-whole",
        )?.innerHTML;

      const rating = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.a-spacing-top-micro > div > span:nth-child(1) > span.a-size-base.puis-bold-weight-text",
        )?.innerHTML;

      const noOfRatings = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.a-spacing-top-micro > div > span:nth-child(2) > a > span",
        )?.innerHTML;

      const link = ele.children
        .item(0)
        .children.item(i)
        .querySelector(
          "div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a",
        )?.href;
      data.push({
        name,
        price,
        rating,
        noOfRatings,
        link,
      });
    }
    return data;
  });

  await page.close();

  console.log(data);

  return data;
};

const getGEMData = async (link) => {
  try {
    const page = await browser.newPage();

    await page.goto(link);

    const data = await page.evaluate(() => {
      const productName = document.querySelector("#title > h1")?.innerHTML;
      const productPrice = document.querySelector(
        "#pricing_summary > div.add-to-cart-price > div.our_price > span > span",
      ).innerHTML;
      const sellerExcellence = document.querySelector(
        "#other_sellers > div > div.seller-rating-tags > div > div > span",
      )?.innerHTML;
      const image = document.querySelector(
        "#img-id-1 > span:nth-child(3) > img",
      )?.src;

      const availableProducts = document.querySelector(
        "#in_stock > span > strong",
      )?.innerText;

      const data = {
        productName,
        productPrice,
        sellerExcellence,
        image,
        availableProducts,
      };

      return data;
    });

    await page.close();

    console.log(data);

    return data;
  } catch (e) {
    console.log(e);
  }
};

const getFlipkartInfo = async (product) => {
  const page = await browser.newPage();
  const r = await page.goto(sites["flipkart"].url + product);

  if (!r.ok()) {
    console.log("Error in opening Flipkart");
    return [];
  }

  //await page.waitForNavigation();

  const data = await page.evaluate(() => {
    const dataa = [];
    const parent = document.querySelector(
      "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2)",
    );

    const len = parent.children.length;
    var index = 1;
    while (index < len - 2) {
      const name = parent.children
        .item(index)
        .querySelector(
          `#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(${
            index + 1
          }) > div > div > div > a > div._3pLy-c.row > div.col.col-7-12 > div._4rR01T`,
        )?.innerHTML;

      const price = parent.children
        .item(index)
        .querySelector(
          `#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(${
            index + 1
          }) > div > div > div > a > div._3pLy-c.row > div.col.col-5-12.nlI3QM > div._3tbKJL > div > div`,
        )?.innerHTML;
      index++;

      var rating = parent.children
        .item(index - 1)
        .querySelector(
          `#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(${index}) > div > div > div > a > div._3pLy-c.row > div.col.col-7-12 > div.gUuXy-> span > div`,
        )?.innerHTML;

        rating = (rating.substring(0, 3));

      const noofRating = parent.children
        .item(index - 1)
        .querySelector(
          `#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(${index}) > div > div > div > a > div._3pLy-c.row > div.col.col-7-12 > div.gUuXy- > span._2_R_DZ > span > span:nth-child(1) > span `,
        );

      const link = parent.children
        .item(index)
        .querySelector(
          `#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(${
            index + 1
          }) > div > div > div > a`,
        );

      var hrefMatch;

      if (link) {
        const hrefPattern = /href="([^"]+)"/;

        hrefMatch = link.outerHTML.match(hrefPattern);

        if (hrefMatch && hrefMatch.length > 1) {
          const hrefValue = hrefMatch[1];
          hrefMatch = "https://flipkart.com" + hrefValue;
        }
      }

      dataa.push({
        name,
        price,
        rating,
        noofRating,
        hrefMatch,
      });
    }

    return dataa;
  });

  await page.close();

  console.log(data);

  return data;
};
const getSnapdealInfo = async (product, category) => {};

app.post("/get-flipkart", async (req, res) => {
  const { product } = req.body;
  const resp = await getFlipkartInfo(product);
  console.log(resp);
});

app.post("/get-other-ecommerce-info", async (req, res) => {
  const { product, category } = req.body;
  let amazonData = await getAmazonInfo(product, category);
  amazonData = amazonData.filter((item) => {
    if (Object.keys(item).length <= 1 && item.constructor === Object) {
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
  await database.collection("products").deleteMany({});
  await database.collection("products").insertMany(data);
  res.json({ data });
});

app.post("/get-gem-info", async (req, res) => {
  const { link } = req.body;
  const data = await getGEMData(link);

  res.json({ data });
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
