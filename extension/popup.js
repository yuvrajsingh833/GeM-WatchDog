// Function to extract product variant ID from the URL
function extractProductVariantID(url) {
  const productID = url.match(/#variant_id=([^&]+)/);
  if (productID && productID[1]) {
    return productID[1];
  }
}

// Function to load and display data from local storage
function loadAndDisplayData(url) {
  // Extract product variant ID from the current URL
  const productID = extractProductVariantID(url);

  // Retrieve data from local storage using the product ID
  chrome.storage.local.get([productID], function (result) {
    const jsonData = result[productID];
    console.log("Retrieved data from local storage:", jsonData);
    if (jsonData) {
      const data = JSON.parse(jsonData);

      // Update the webpage with the retrieved data
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
    } else {
      console.log("Data not found in local storage for productID:", productID);
    }
  });
}

// Function to add a custom button to the page
function addCustomButton() {
  var targetElement = document.querySelector(
    "#pricing_summary > div.add-to-cart-price"
  );

  if (targetElement) {
    var specificDiv = targetElement.querySelector(
      "#pricing_summary > div.add-to-cart-price > div.discount_gola"
    );

    if (specificDiv) {
      var newButton = document.createElement("button");
      newButton.textContent = "Compare";

      newButton.addEventListener("click", function() {
        const href = `http://localhost:5173/?url=${window.location.href}`;
        window.open(href, "_blank");
    });

    // Insert the button after the specific div
      specificDiv.parentNode.insertBefore(newButton, specificDiv.nextSibling);
    }
  }
}

// Run the addCustomButton function when the page loads
window.addEventListener("load", function () {
  addCustomButton();

  // Get the current tab's URL and pass it to loadAndDisplayData
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentURL = tabs[0].url;
    loadAndDisplayData(currentURL); // Load and display data when the page loads
  });
});

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
