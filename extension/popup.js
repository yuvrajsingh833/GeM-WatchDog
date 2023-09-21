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
                })
                .catch((error) => {
                    console.error("Error:", error);
                    resultDiv.textContent = "Error occurred. Check the console for details.";
                });
        } else {
            resultDiv.textContent = "Category or product not found in the URL.";
        }
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
