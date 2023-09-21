document.addEventListener("DOMContentLoaded", function () {
  function extractCategoryAndProduct(url) {
    const urlParts = url.split("/");
    if (urlParts.length >= 4) {
      const category = urlParts[3];
      const product = urlParts[4].split("-").join(" ");
      console.log(category, product);
      return { category, product };
    }
    console.log("Category or product not found in the URL.");
    return { category: "", product: "" };
  }

  const resultDiv = document.getElementById("result");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const tabUrl = currentTab.url;

    const { category, product } = extractCategoryAndProduct(tabUrl);

    if (category && product) {
      const requestBody = {
        product,
        category,
      };

      fetch("http://localhost:8000/get-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          resultDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
          console.error("Error:", error);
          resultDiv.textContent =
            "Error occurred. Check the console for details.";
        });
    } else {
      resultDiv.textContent = "Category or product not found in the URL.";
    }
  });
});

// Function to add the button
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

      // Insert the button after the specific div
      specificDiv.parentNode.insertBefore(newButton, specificDiv.nextSibling);
    }
  }
}

// Run the addCustomButton function when the page loads
window.addEventListener("load", addCustomButton);
