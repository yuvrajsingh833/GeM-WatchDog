function extractProductVariantID(url) {
  const productID = url.match(/#variant_id=([^&]+)/);
  if (productID && productID[1]) {
    return productID[1];
  }
}

function trimAndCleanString(inputString) {
  let cleanedString = inputString
    .replace(/\n/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  cleanedString = cleanedString.replace(/<[^>]*>/g, "");
  return cleanedString;
}

function handleTabNavigation(details) {
  if (details.url && details.url.includes("mkp.gem.gov.in")) {
    const urlParts = new URL(details.url).pathname.split("/");
    if (urlParts.length >= 4) {
      const category = urlParts[1];
      fetch("http://localhost:8000/get-gem-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: details.url,
        }),
      })
        .then((response) => response.json())
        .then((gemData) => {
          if (gemData && gemData.data && gemData.data.productName) {
            const product = trimAndCleanString(gemData.data.productName);

            const requestBody = {
              product: product,
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
                chrome.storage.local.set(localData, function () {});
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            console.error("GEM API did not return the expected product name.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

chrome.webNavigation.onCompleted.addListener(handleTabNavigation);
