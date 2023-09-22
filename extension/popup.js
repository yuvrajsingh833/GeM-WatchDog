function extractProductVariantID(url) {
  const productID = url.match(/#variant_id=([^&]+)/);
  if (productID && productID[1]) {
    return productID[1];
  }
}

function createTable(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("product-table");

  const headers = ["Name", "Price", "Rating", "Number of Ratings"];

  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");

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
      cell.addEventListener("click", function () {
        const href = item.link;
        window.open(href, "_blank");
      });

      cell.addEventListener("mouseover", () => {
        cell.style.cursor = "pointer";
        cell.style.textDecoration = "underline";
      });

      cell.addEventListener("mouseout", () => {
        cell.style.cursor = "default";
        cell.style.textDecoration = "none";
      });

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  resultDiv.appendChild(table);
}

function loadAndDisplayData(url) {
  const productID = extractProductVariantID(url);

  chrome.storage.local.get([productID], function (result) {
    const jsonData = result[productID];
    if (jsonData) {
      const data = JSON.parse(jsonData);
      createTable(data);
    } else {
      console.log("Data not found in local storage for productID:", productID);
    }
  });
}

function addCustomButton() {
  const targetElement = document.querySelector(
    "#pricing_summary > div.add-to-cart-price",
  );

  if (targetElement) {
    const specificDiv = targetElement.querySelector(
      "#pricing_summary > div.add-to-cart-price > div.discount_gola",
    );

    if (specificDiv) {
      const newButton = document.createElement("button");
      newButton.textContent = "Compare";

      newButton.addEventListener("click", function () {
        const href = `http://localhost:5173/?url=${window.location.href}`;
        window.open(href, "_blank");
      });
      specificDiv.parentNode.insertBefore(newButton, specificDiv.nextSibling);
    }
  }
}

function onPageLoad() {
  addCustomButton();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentURL = tabs[0].url;
    loadAndDisplayData(currentURL);
  });
}

window.addEventListener("load", onPageLoad);
