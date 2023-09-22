function onLoad() {
  addCustomButton();

  chrome.storage.local.get(["data"], function (result) {
    const data = JSON.parse(result.data);

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("product-table");

    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Name", "Price", "Rating", "Number of Ratings"];

    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");

    data.data.forEach((item) => {
      const row = document.createElement("tr");
      const keys = ["name", "price", "rating", "noOfRatings"];

      keys.forEach((key) => {
        const cell = document.createElement("td");
        cell.textContent = item[key];
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);

    resultDiv.appendChild(table);
  });
}

// Function to add the button on the page
function addCustomButton() {
  var targetElement = document.querySelector(
    "#pricing_summary > div.add-to-cart-price",
  );

  if (targetElement) {
    var specificDiv = targetElement.querySelector(
      "#pricing_summary > div.add-to-cart-price > div.discount_gola",
    );

    if (specificDiv) {
      var newButton = document.createElement("button");
      newButton.textContent = "Compare";

      // Insert the button after the specific div
      specificDiv.parentNode.insertBefore(newButton, specificDiv.nextSibling);
    }
  }
}

// Run the addCustomButton function when the page loads
window.addEventListener("load", onLoad);

// Function to handle messages from the background.js
function handleMessage(message) {
  if (message.type === "API_RESPONSE") {
    console.log("Received API data in popup:", message.responseData);
    let data = message.responseData;

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("product-table");

    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Name", "Price", "Rating", "Number of Ratings"];

    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");

    data.data.forEach((item) => {
      const row = document.createElement("tr");
      const keys = ["name", "price", "rating", "noOfRatings"];

      keys.forEach((key) => {
        const cell = document.createElement("td");
        cell.textContent = item[key];
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);

    resultDiv.appendChild(table);
  }
}

// Add a listener to handle messages from the background.js
chrome.runtime.onMessage.addListener(handleMessage);
