import { addProductToCart } from "./cart.js";

export const LUGGAGE_SETS_CATEGORY = "luggage sets";
const SELECTED_PRODUCT_STORAGE_KEY = "selectedProductLocalStorageKey";

export async function loadJsonData() {
  try {
    const response = await fetch("/src/assets/data.json");
    return await response.json();
  } catch (error) {
    console.error("Error loading json data: ", error);
  }
}

const getSelectedProduct = () => {
  const selectedProductFromStorage = localStorage.getItem(
    SELECTED_PRODUCT_STORAGE_KEY,
  );

  if (!selectedProductFromStorage) {
    return null;
  }

  return JSON.parse(selectedProductFromStorage);
};

export function navigateToProductDetailsPage(product) {
  localStorage.setItem(SELECTED_PRODUCT_STORAGE_KEY, JSON.stringify(product));

  window.location.href = "/product-details.html";
}

export const getProductRatingHTMLElement = (product) => {
  const productRatingContainer = document.createElement("div");

  const roundedProductRating = Math.round(product.rating);

  for (let i = 1; i <= 5; i++) {
    const img = document.createElement("img");

    const hasGreaterRating = roundedProductRating >= i;

    if (hasGreaterRating) {
      img.src = "/src/assets/images/gold-star.svg";
    } else {
      img.src = "/src/assets/images/gray-star.svg";
    }

    productRatingContainer.appendChild(img);
  }

  return productRatingContainer;
};

function renderProductCard() {
  const productCard = document.createElement("div");
  productCard.className = "product-card";

  return productCard;
}

function renderProductImage(product) {
  const imageSection = document.createElement("div");
  imageSection.className = "product-card__image-section";

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;
  image.className = "product-card__image-section-image";

  if (product.salesStatus) {
    const saleBadge = document.createElement("div");
    saleBadge.className = "product-card__sale-badge";
    saleBadge.textContent = "SALE";

    imageSection.appendChild(saleBadge);
  }

  imageSection.appendChild(image);

  imageSection.addEventListener("click", () => {
    navigateToProductDetailsPage(product);
  });

  return imageSection;
}

function renderProductNameParagraph(product) {
  const productNameParagraph = document.createElement("p");
  productNameParagraph.className = "product-card__name-paragraph";

  productNameParagraph.innerHTML = product.name;

  return productNameParagraph;
}

function renderProductPriceParagraph(product) {
  const productPriceParagraph = document.createElement("p");
  productPriceParagraph.className = "product-card__price-paragraph";

  productPriceParagraph.innerHTML = `$${product.price}`;

  return productPriceParagraph;
}

function renderProductButton(product, actionButtonLabel, onActionButtonClick) {
  const productButton = document.createElement("button");
  productButton.className = "button-primary product-card__button-primary";

  productButton.innerHTML = actionButtonLabel;
  productButton.onclick = () => {
    onActionButtonClick(product);
  };

  return productButton;
}

export function renderProductCards({
  products,
  productsContainer,
  actionButtonLabel,
  onActionButtonClick,
}) {
  products.forEach((product) => {
    const productCard = renderProductCard();
    const imageSection = renderProductImage(product);
    const productNameParagraph = renderProductNameParagraph(product);
    const productPriceParagraph = renderProductPriceParagraph(product);
    const productButton = renderProductButton(
      product,
      actionButtonLabel,
      onActionButtonClick,
    );

    productCard.appendChild(imageSection);
    productCard.appendChild(productNameParagraph);
    productCard.appendChild(productPriceParagraph);
    productCard.appendChild(productButton);

    productsContainer.appendChild(productCard);
  });
}

const renderProductDetailsImage = (selectedProduct) => {
  const productDetailsContainerImagesMainImage = document.getElementById(
    "product-details-container-images-main-image",
  );

  if (!productDetailsContainerImagesMainImage) {
    return;
  }

  const img = document.createElement("img");
  img.src = selectedProduct.imageUrl;
  img.alt = selectedProduct.name;

  productDetailsContainerImagesMainImage.appendChild(img);
};

const renderProductDetailsName = (selectedProduct) => {
  const productDetailsContainerName = document.getElementById(
    "product-details-container-details-name",
  );

  if (!productDetailsContainerName) {
    return;
  }

  productDetailsContainerName.innerHTML = selectedProduct.name;

  return productDetailsContainerName;
};

const renderProductDetailsRating = (selectedProduct) => {
  const productDetailsContainerRating = document.getElementById(
    "product-details-container-details-rating",
  );

  if (!productDetailsContainerRating) {
    return;
  }

  const ratingElement = getProductRatingHTMLElement(selectedProduct);

  productDetailsContainerRating.appendChild(ratingElement);

  return productDetailsContainerRating;
};

const renderProductDetailsPrice = (selectedProduct) => {
  const productDetailsContainerPrice = document.getElementById(
    "product-details-container-details-price",
  );

  if (!productDetailsContainerPrice) {
    return;
  }

  productDetailsContainerPrice.innerHTML = `$${selectedProduct.price}`;

  return productDetailsContainerPrice;
};

const attachProductDetailsEventListeners = (selectedProduct) => {
  const addToCartButton = document.getElementById("button-add-to-cart");
  const quantityDecreaseButton = document.getElementById("quantity-decrease");
  const quantityIncreaseButton = document.getElementById("quantity-increase");
  const quantityValueElement = document.getElementById("quantity-value");

  let currentQuantity = 1;

  const updateQuantityDisplay = () => {
    if (quantityValueElement) {
      quantityValueElement.textContent = currentQuantity;
    }

    if (quantityDecreaseButton) {
      quantityDecreaseButton.disabled = currentQuantity <= 1;
    }
  };

  if (quantityDecreaseButton) {
    quantityDecreaseButton.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
      }
    });
  }

  if (quantityIncreaseButton) {
    quantityIncreaseButton.addEventListener("click", () => {
      currentQuantity++;
      updateQuantityDisplay();
    });
  }

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      for (let i = 0; i < currentQuantity; i++) {
        addProductToCart(selectedProduct);
      }
      currentQuantity = 1;
      updateQuantityDisplay();
    });
  }
};

const renderProductDetails = (selectedProduct) => {
  renderProductDetailsImage(selectedProduct);
  renderProductDetailsName(selectedProduct);
  renderProductDetailsRating(selectedProduct);
  renderProductDetailsPrice(selectedProduct);

  attachProductDetailsEventListeners(selectedProduct);
};

const initializeTabs = () => {
  const tabButtons = document.querySelectorAll(".tabs-button");
  const tabPanels = document.querySelectorAll(".tabs-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedTabName = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => {
        btn.classList.remove("tabs-button-active");
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove("tabs-panel-active");
      });

      button.classList.add("tabs-button-active");

      const activePanel = document.querySelector(
        `.tabs-panel[data-panel="${clickedTabName}"]`,
      );

      if (activePanel) {
        activePanel.classList.add("tabs-panel-active");
      }
    });
  });
};

const initializeReviewForm = () => {
  const form = document.getElementById("review-form");
  const statusBox = document.getElementById("feedback-status");

  if (!form || !statusBox) {
    return;
  }

  function showError(input, message) {
    const group = input.parentElement;
    const error = group.querySelector(".error-message");
    if (error) {
      error.textContent = message;
    }
  }

  function clearError(input) {
    const group = input.parentElement;
    const error = group.querySelector(".error-message");
    if (error) {
      error.textContent = "";
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("input", (e) => {
    const input = e.target;

    if (input.required && input.value.trim() === "") {
      showError(input, "This field is required.");
    } else if (input.type === "email" && !validateEmail(input.value)) {
      showError(input, "Please enter a valid email.");
    } else {
      clearError(input);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    [...form.elements].forEach((input) => {
      if (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA") return;

      if (input.required && input.value.trim() === "") {
        showError(input, "This field is required.");
        valid = false;
      }

      if (input.type === "email" && !validateEmail(input.value)) {
        showError(input, "Please enter a valid email.");
        valid = false;
      }
    });

    if (!valid) return;

    statusBox.style.color = "green";
    statusBox.textContent = "Your review has been submitted successfully!";

    form.reset();
  });
};

export const getLuggagesWithoutSets = (allProducts) => {
  return allProducts.filter((product) => {
    return product.category !== LUGGAGE_SETS_CATEGORY;
  });
};

export const getLuggageSets = (allProducts) => {
  return allProducts.filter((product) => {
    return product.category === LUGGAGE_SETS_CATEGORY;
  });
};

/**
 * Randomizes the products array. Based on - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#:~:text=This%20https%3A//javascript.info/array%2Dmethods%23shuffle%2Dan%2Darray%20tutorial%20explains%20the%20differences%20straightforwardly.
 */
const getRandomProducts = (products, count) => {
  const shuffledProducts = products.sort(() => 0.5 - Math.random());

  return shuffledProducts.slice(0, count);
};

const renderRecommendedProducts = async () => {
  const recommendationsProductsContainer = document.getElementById(
    "recommendations-products-container",
  );

  if (!recommendationsProductsContainer) {
    return;
  }

  const jsonData = await loadJsonData();
  const allProducts = jsonData.data;

  const allProductsWihoutSets = getLuggagesWithoutSets(allProducts);
  const randomProducts = getRandomProducts(allProductsWihoutSets, 4);

  const handleActionButtonClick = (product) => {
    addProductToCart(product);
  };

  renderProductCards({
    products: randomProducts,
    productsContainer: recommendationsProductsContainer,
    actionButtonLabel: "Add To Cart",
    onActionButtonClick: handleActionButtonClick,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const productDetails = document.getElementsByClassName("product-details");

  if (!productDetails) {
    return;
  }

  const selectedProduct = getSelectedProduct();

  if (!selectedProduct) {
    return;
  }

  renderProductDetails(selectedProduct);

  renderRecommendedProducts();

  initializeTabs();

  initializeReviewForm();
});
