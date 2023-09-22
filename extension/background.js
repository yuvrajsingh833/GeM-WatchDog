function extractProductVariantID(url) {
  const productID = url.match(/#variant_id=([^&]+)/);
  if (productID && productID[1]) {
    return productID[1];
  }
}
function handleTabNavigation(details) {
  if (details.url && details.url.includes("mkp.gem.gov.in")) {
    console.log("Tab URL found:", details.url);
    const urlParts = new URL(details.url).pathname.split("/");
    if (urlParts.length >= 4) {
      console.log("Test");
      const category = urlParts[1];
      const product = urlParts[2].split("-").join(" ");
      console.log("Parsed category and product:", category, product);
      const requestBody = {
        product,
        category,
      };
      fetch("http://localhost:8000/get-other-ecommerce-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          const productID = extractProductVariantID(details.url);
          const localData = {
            [productID]: JSON.stringify(data),
          };
          chrome.storage.local.set(localData, function () {
            console.log("Data has been stored in chrome.storage.", productID);
          });
          chrome.runtime.sendMessage({
            type: "API_RESPONSE",
            responseData: data,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

chrome.webNavigation.onCompleted.addListener(handleTabNavigation);
