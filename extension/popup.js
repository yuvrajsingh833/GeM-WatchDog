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
                    resultDiv.textContent = "Error occurred. Check the console for details.";
                });
        } else {
            resultDiv.textContent = "Category or product not found in the URL.";
        }
    });
});
