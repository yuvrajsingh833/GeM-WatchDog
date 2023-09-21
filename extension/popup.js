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
                resultDiv.textContent = "Error occurred. Check the console for details.";
            });
    });
});
