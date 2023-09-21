document.addEventListener("DOMContentLoaded", function () {
  const productInput = document.getElementById("productInput");
  const categoryInput = document.getElementById("categoryInput");
  const makeRequestButton = document.getElementById("makeRequest");
  const resultDiv = document.getElementById("result");

  makeRequestButton.addEventListener("click", function () {
    const product = productInput.value;
    const category = categoryInput.value;

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
        console.log("API Result:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        resultDiv.textContent =
          "Error occurred. Check the console for details.";
      });
  });
});

// Function to add the button
function addCustomButton() {
  var newButton = document.createElement("button");
  newButton.textContent = "Compare";

  newButton.style.position = "fixed";
  newButton.style.top = "10px";
  newButton.style.right = "10px";
  newButton.style.zIndex = "9999";

  document.body.appendChild(newButton);
}

// Run the addCustomButton function when the page loads
window.addEventListener("load", addCustomButton);
