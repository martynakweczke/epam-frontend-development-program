import {
  loadJsonData,
  renderProductCards,
  navigateToProductDetailsPage,
} from "./product.js";
import { addProductToCart } from "./cart.js";

function loadProductCards(
  jsonData,
  productBlock,
  productsContainerSelector,
  actionButtonLabel,
  onActionButtonClick,
) {
  const filteredProducts = jsonData.data.filter((product) =>
    product.blocks.includes(productBlock),
  );

  const productsContainer = document.querySelector(productsContainerSelector);

  if (!productsContainer) {
    return;
  }

  renderProductCards({
    products: filteredProducts,
    productsContainer,
    actionButtonLabel,
    onActionButtonClick,
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const jsonData = await loadJsonData();

  const handleAddToCartClick = (product) => {
    addProductToCart(product);
  };

  const handleViewProductClick = (product) => {
    navigateToProductDetailsPage(product);
  };

  loadProductCards(
    jsonData,
    "Selected Products",
    "#selected-products",
    "Add To Cart",
    handleAddToCartClick,
  );
  loadProductCards(
    jsonData,
    "New Products Arrival",
    "#new-products-arrival",
    "View Product",
    handleViewProductClick,
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const randomTexts = [
    "Adventure awaits!",
    "Pack your dreams!",
    "Discover new places!",
    "Wander more!",
    "Journey begins!",
  ];

  const cards = document.querySelectorAll(".image-card");

  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * randomTexts.length);
    const randomText = randomTexts[randomIndex];
    card.setAttribute("data-random-text", randomText);
  });
});
