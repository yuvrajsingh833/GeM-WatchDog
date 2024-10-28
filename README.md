# Gem Watchdog

## Ministry of Commerce and Industries - Student Innovation



**Problem Statement Title:** Price comparison of GeM products with other e-marketplaces


---

## Overview

Welcome to GEM Watchdog, a groundbreaking solution aimed at revolutionizing the online shopping experience on the Government e-Marketplace (GeM) platform. By harnessing cutting-edge technology, data analytics, and artificial intelligence, GEM Watchdog empowers consumers, vendors, and e-commerce companies with invaluable insights, competitive advantages, and efficient decision-making tools.

### Key Features

#### For Consumers:

- **Smart Shopping:** Compare prices, read reviews, and analyze trends.
- **Cost Savings:** Find the best deals and save time.
- **Product Assessment:** Gauge product quality and popularity.
- **Gift Shopping:** Make budget-friendly gift choices.
- **Price Alerts:** Get notified of price drops.
- **In-depth Analysis:** Explore comprehensive product data.

#### For Vendors:

- **Competitive Edge:** Monitor real-time prices and adjust strategies.
- **Market Insights:** Gain pricing trends and consumer preferences.
- **Product Optimization:** Enhance listings and expand offerings.
- **Inventory Management:** Efficiently manage inventory with forecasts.
- **Dynamic Pricing:** Maximize profitability with real-time adjustments.
- **Strategic Expansion:** Identify high-demand regions.

#### For E-commerce Companies:

- **Competitive Advantage:** Enhance user experience with price comparison.
- **Data Insights:** Access valuable data on product trends.
- **Increased Sales:** Attract vendors with competitive offerings.
- **Dynamic Pricing:** Implement real-time pricing strategies.
- **Market Expansion:** Attract vendors with demand insights.

### Core Functionality

- **Real-time Price Comparison:** Compare prices from multiple e-commerce websites instantly, eliminating the need for manual research.
- **Comprehensive Data Analytics:** Access detailed analytics, including price comparisons, product trends, reviews, and more on the dedicated website.
- **Data-Driven Recommendations:** Leverage machine learning and AI for top 15 E-Commerce product recommendations, saving time.
- **Data Sources:** Gather data from various e-commerce platforms via web scraping and APIs, including GeM and Amazon.

---

## Technology Stack

- **Web Application:** React (with TypeScript), Tailwind CSS, Nivo, Chart.js.
- **Extension:** HTML, CSS, JavaScript (JS).
- **Server:** JavaScript (Node.js), Express, Puppeteer.
- **Data Collection & Analysis:** Python, Advanced Data Scraping, API Integration, Word Embeddings, Clustering, Regression.
- **Data Management:** MySQL, MongoDB, AWS, GCP.
- **Software Engineering:** Git, Docker, CI/CD.
- **Machine Learning Frameworks:** TensorFlow, PyTorch.

---

## Implementation Details

- **Web Scraping Tools:** Use web scraping techniques for data collection, adapting to website changes, and handling anti-scraping measures.
- **API Integration:** Integrate external APIs for real-time data retrieval and comparison.
- **Data Analytics:** Apply analytics for efficient data processing, enabling insights and recommendations, including machine learning and AI.
- **Cloud Infrastructure:** Depend on AWS (Amazon Web Services) with EC2 and S3 for hosting, scalability, and data storage.
- **Database Management:** Utilize databases like MongoDB for efficient data storage and retrieval.

---


GEM Watchdog aims to enhance the GeM platform's efficiency, transparency, and user experience by providing valuable insights and data-driven recommendations to all stakeholders, ultimately facilitating better decision-making in the e-commerce ecosystem.

---

## Flow Chart

![SIH Infra Diagram](https://github.com/Geoffrey-Anto/sih-2023/assets/70687348/77ec01d5-9f93-4639-91ae-28575de293ff)

---

## Getting Started

This repository contains three main components for the SIH 2023 Gem Marketplace project:

1. **App**: The frontend application.
2. **Extension**: The Chrome browser extension.
3. **Server**: The backend server deployed on AWS EC2

Follow the steps below to get a copy of the project up and running on your local machine:

1. **Prerequisites**: Ensure you have Node.js (v12 or higher) and npm or pnpm installed on your system.

2. **Clone the Repository**: Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/yuvrajsingh833/GeM-WatchDog
   ```

   ```


## Installation

### App

1. Open your terminal.
2. Navigate to the `app` directory using the `cd` command:

```
cd app
```

3. Install the necessary dependencies using your package manager of choice (pnpm, yarn, or npm):

```
pnpm i
# or
npm i
# or
yarn
```

#### Running the App

To start the application, run the following command:

```
pnpm run dev
# or
npm run dev
# or
yarn run dev
```

The local server will be running on port `http://localhost:5173`.

### Extension

This extension is not available on the Google Chrome Web Store. Follow these instructions to install it in Chromium-based desktop browsers.

#### Load Unpacked: Chrome, MS Edge, or Brave (All Desktop)

1. Download this repository as a ZIP-file from [Github](https://github.com/yuvrajsingh833/GeM-WatchDog).

2. Unzip the file to get a folder 

3. Move to the folder to a permanent location on your computer (do not delete it after installation).

4. Open your Chromium-based browser and go to the extensions page (`chrome://extensions`).

5. Enable Developer Mode.

6. Click `Load unpacked` and select/open the `extension` folder (which contains the file `manifest.json`).

If you are familiar with Github, you can also clone this repository and update the extension by loading the unpacked folder used by the Github client.

### Server

1. Open your terminal.

2. Navigate to the `server` directory using the `cd` command:

   ```
   cd server
   ```

3. Install the necessary server dependencies using your package manager of choice (npm, pnpm, or yarn):
   ```
   pnpm i
   # or
   npm i
   # or
   yarn
   ```

#### Running the Server

To start the server, run the following command:

```
pnpm run dev
```

The local server will be up and running on `http://localhost:8000`.

Please make sure all components are installed and running correctly to utilize the Gem Watchdog project fully.
