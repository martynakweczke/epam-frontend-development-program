import { addProductToCart } from "./cart.js";
import {
  getLuggageSets,
  getLuggagesWithoutSets,
  getProductRatingHTMLElement,
  loadJsonData,
  navigateToProductDetailsPage,
  renderProductCards,
} from "./product.js";

const MAX_PRODUCTS_PER_PAGE = 12;
const DEFAULT_FILTERS = {
  size: null,
  color: null,
  category: null,
  salesStatus: false,
};

let allFilteredLuggages = [];
let allFetchedProducts = [];
let currentPage = 1;
let appliedSort = null;
let appliedFilters = { ...DEFAULT_FILTERS };

const resetFilters = () => {
  appliedFilters = { ...DEFAULT_FILTERS };

  const sizeSelect = document.getElementById("filter-size");
  const colorSelect = document.getElementById("filter-color");
  const categorySelect = document.getElementById("filter-category");
  const salesCheckbox = document.getElementById("filter-sales");

  if (sizeSelect) {
    sizeSelect.value = "";
  }

  if (colorSelect) {
    colorSelect.value = "";
  }

  if (categorySelect) {
    categorySelect.value = "";
  }

  if (salesCheckbox) {
    salesCheckbox.checked = false;
  }

  updateFilterVisualState();
  applyFilters();
};

const updateFilterVisualState = () => {
  const sizeSelect = document.getElementById("filter-size");
  const colorSelect = document.getElementById("filter-color");
  const categorySelect = document.getElementById("filter-category");

  if (sizeSelect) {
    if (sizeSelect.value) {
      sizeSelect.classList.add("filter-active");
    } else {
      sizeSelect.classList.remove("filter-active");
    }
  }

  if (colorSelect) {
    if (colorSelect.value) {
      colorSelect.classList.add("filter-active");
    } else {
      colorSelect.classList.remove("filter-active");
    }
  }

  if (categorySelect) {
    if (categorySelect.value) {
      categorySelect.classList.add("filter-active");
    } else {
      categorySelect.classList.remove("filter-active");
    }
  }
};

const applyFilters = () => {
  let filteredProducts = getLuggagesWithoutSets(allFetchedProducts);

  if (appliedFilters.size) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.size === appliedFilters.size;
    });
  }

  if (appliedFilters.color) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.color === appliedFilters.color;
    });
  }

  if (appliedFilters.category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === appliedFilters.category;
    });
  }

  if (appliedFilters.salesStatus) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.salesStatus === true;
    });
  }

  allFilteredLuggages = filteredProducts;

  if (appliedSort !== null) {
    allFilteredLuggages = getSortedLuggages(appliedSort);
  }

  goToPage(1);
};

const getPaginatedProducts = () => {
  const startIndex = (currentPage - 1) * MAX_PRODUCTS_PER_PAGE;
  const endIndex = startIndex + MAX_PRODUCTS_PER_PAGE;

  return allFilteredLuggages.slice(startIndex, endIndex);
};

const refreshPaginationButtons = () => {
  const allFilteredLuggagesCount = allFilteredLuggages.length;

  const shouldShowNextButton =
    allFilteredLuggagesCount > currentPage * MAX_PRODUCTS_PER_PAGE;

  const nextPageButton = document.getElementById("pagination-next");

  if (shouldShowNextButton) {
    nextPageButton.style.visibility = "visible";
  } else {
    nextPageButton.style.visibility = "hidden";
  }

  const shouldPreviousButton = currentPage > 1;

  const previousPageButton = document.getElementById("pagination-previous");

  if (shouldPreviousButton) {
    previousPageButton.style.visibility = "visible";
  } else {
    previousPageButton.style.visibility = "hidden";
  }
};

const refreshPaginationInfo = () => {
  const allFilteredLuggagesCount = allFilteredLuggages.length;

  const productsVisibleRangeElement = document.getElementById(
    "products-visible-range",
  );

  if (productsVisibleRangeElement) {
    const startIndex = (currentPage - 1) * MAX_PRODUCTS_PER_PAGE;
    const endIndex = startIndex + MAX_PRODUCTS_PER_PAGE;

    const startRange = allFilteredLuggagesCount === 0 ? 0 : startIndex + 1;
    const endRange =
      endIndex > allFilteredLuggagesCount ? allFilteredLuggagesCount : endIndex;

    productsVisibleRangeElement.textContent = `${startRange}-${endRange}`;
  }

  const allProductsCountElement = document.getElementById("all-products-count");

  if (allProductsCountElement) {
    allProductsCountElement.textContent = allFilteredLuggagesCount;
  }
};

const getTotalPages = () => {
  const allFilteredLuggagesCount = allFilteredLuggages.length;

  return Math.ceil(allFilteredLuggagesCount / MAX_PRODUCTS_PER_PAGE);
};

const refreshPaginationPageNumbers = () => {
  const paginationPageNumbersElement = document.getElementById(
    "pagination-page-numbers",
  );

  if (!paginationPageNumbersElement) {
    return;
  }

  const totalPages = getTotalPages();

  if (totalPages <= 1) {
    paginationPageNumbersElement.style.visibility = "hidden";

    return;
  }

  paginationPageNumbersElement.style.visibility = "visible";

  paginationPageNumbersElement.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButtonElement = document.createElement("button");

    pageButtonElement.className = "pagination-button";

    if (i === currentPage) {
      pageButtonElement.classList.add("pagination-button-active");
    }

    pageButtonElement.textContent = i;

    pageButtonElement.addEventListener("click", () => {
      goToPage(i);
    });

    paginationPageNumbersElement.appendChild(pageButtonElement);
  }
};

const refreshPaginationElements = () => {
  refreshPaginationButtons();

  refreshPaginationInfo();

  refreshPaginationPageNumbers();
};

const goToPage = (newPage) => {
  currentPage = newPage;

  const paginatedProducts = getPaginatedProducts();

  refreshProductCards(paginatedProducts);

  refreshPaginationElements();

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const refreshProductCards = (products) => {
  const productsContainer = document.querySelector("#products-container");

  if (!productsContainer) {
    return;
  }

  const handleAddToCartClick = (product) => {
    addProductToCart(product);
  };

  productsContainer.innerHTML = "";

  renderProductCards({
    products,
    productsContainer,
    actionButtonLabel: "Add To Cart",
    onActionButtonClick: handleAddToCartClick,
  });
};

const getSortedLuggages = (sortValue) => {
  let sortedLuggages = [];

  switch (sortValue) {
    case "price-low":
      sortedLuggages = allFilteredLuggages.toSorted((a, b) => {
        return a.price - b.price;
      });
      break;
    case "price-high":
      sortedLuggages = allFilteredLuggages.toSorted((a, b) => {
        return b.price - a.price;
      });
      break;
    case "popularity":
      sortedLuggages = allFilteredLuggages.toSorted((a, b) => {
        return b.popularity - a.popularity;
      });
      break;
    case "rating":
      sortedLuggages = allFilteredLuggages.toSorted((a, b) => {
        return b.rating - a.rating;
      });
      break;
    default:
      sortedLuggages = getLuggagesWithoutSets(allFetchedProducts);
      break;
  }

  return sortedLuggages;
};

function loadProductCards(allProducts) {
  const productsContainer = document.querySelector("#products-container");

  if (!productsContainer) {
    return;
  }

  const allLuggagesWithoutSets = getLuggagesWithoutSets(allProducts);

  allFilteredLuggages = allLuggagesWithoutSets;

  const handleAddToCartClick = (product) => {
    addProductToCart(product);
  };

  const productsToRender = getPaginatedProducts();

  renderProductCards({
    products: productsToRender,
    productsContainer,
    actionButtonLabel: "Add To Cart",
    onActionButtonClick: handleAddToCartClick,
  });
}

const loadTopBestProductSets = (allProducts) => {
  const productSetsContainer = document.getElementById("product-sets");

  if (!productSetsContainer) {
    return;
  }

  const allLuggageSetProducts = getLuggageSets(allProducts);

  allLuggageSetProducts.forEach((luggageSetProduct) => {
    const lugaggeSetContainerElement = document.createElement("div");

    lugaggeSetContainerElement.className = "luggage-set-container";

    const imageElement = document.createElement("img");
    imageElement.src = luggageSetProduct.imageUrl;
    imageElement.alt = luggageSetProduct.name;
    imageElement.className = "luggage-set-image";

    imageElement.addEventListener("click", () => {
      navigateToProductDetailsPage(luggageSetProduct);
    });

    const luggageDetailsContainer = document.createElement("div");

    luggageDetailsContainer.className = "luggage-set-details";

    const luggageName = document.createElement("p");

    luggageName.textContent = luggageSetProduct.name;
    luggageName.className = "luggage-set-details-name";

    const luggageRating = getProductRatingHTMLElement(luggageSetProduct);
    luggageRating.className = "luggage-set-details-rating";

    const luggagePrice = document.createElement("p");

    luggagePrice.textContent = `$${luggageSetProduct.price}`;
    luggagePrice.className = "luggage-set-details-price";

    luggageDetailsContainer.appendChild(luggageName);
    luggageDetailsContainer.appendChild(luggageRating);
    luggageDetailsContainer.appendChild(luggagePrice);

    lugaggeSetContainerElement.appendChild(imageElement);
    lugaggeSetContainerElement.appendChild(luggageDetailsContainer);

    productSetsContainer.appendChild(lugaggeSetContainerElement);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const jsonData = await loadJsonData();

  const allProducts = jsonData.data;

  allFetchedProducts = allProducts;

  loadProductCards(allProducts);

  loadTopBestProductSets(allProducts);

  const previousPageButton = document.getElementById("pagination-previous");

  if (previousPageButton) {
    previousPageButton.addEventListener("click", () => {
      goToPage(currentPage - 1);
    });
  }

  const nextPageButton = document.getElementById("pagination-next");

  if (nextPageButton) {
    nextPageButton.addEventListener("click", () => {
      goToPage(currentPage + 1);
    });
  }

  refreshPaginationElements();
});

document.addEventListener("DOMContentLoaded", () => {
  const sortSelectElement = document.querySelector("#sort-select");

  if (!sortSelectElement) {
    return;
  }

  sortSelectElement.addEventListener("change", (event) => {
    const sortValue = event.target.value;

    appliedSort = sortValue;

    const sortedLuggages = getSortedLuggages(sortValue);

    allFilteredLuggages = sortedLuggages;

    refreshProductCards(sortedLuggages);

    goToPage(1);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInputElement = document.getElementById("search-input");

  if (!searchInputElement) {
    return;
  }

  searchInputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const inputValue = searchInputElement.value;
      const trimmedInputValue = inputValue.trim();

      if (trimmedInputValue.length === 0) {
        window.alert("Product not found");
        return;
      }

      const matchedProduct = allFetchedProducts.find((product) => {
        return product.name.toLowerCase() === trimmedInputValue.toLowerCase();
      });

      if (matchedProduct) {
        navigateToProductDetailsPage(matchedProduct);
      } else {
        window.alert("Product not found");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.getElementById("filter-toggle-button");
  const filtersPanel = document.getElementById("filters-panel");
  const hideButton = document.getElementById("button-hide-filters");
  const clearFiltersButton = document.getElementById("button-clear-filters");
  const sizeSelect = document.getElementById("filter-size");
  const colorSelect = document.getElementById("filter-color");
  const categorySelect = document.getElementById("filter-category");
  const salesCheckbox = document.getElementById("filter-sales");

  if (filterButton) {
    filterButton.addEventListener("click", () => {
      filtersPanel.classList.toggle("filters-expanded");
    });
  }

  if (hideButton) {
    hideButton.addEventListener("click", () => {
      filtersPanel.classList.toggle("filters-expanded");
    });
  }

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", () => {
      resetFilters();
    });
  }

  if (sizeSelect) {
    sizeSelect.addEventListener("change", (event) => {
      appliedFilters.size = event.target.value || null;
      updateFilterVisualState();
      applyFilters();
    });
  }

  if (colorSelect) {
    colorSelect.addEventListener("change", (event) => {
      appliedFilters.color = event.target.value || null;
      updateFilterVisualState();
      applyFilters();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", (event) => {
      appliedFilters.category = event.target.value || null;
      updateFilterVisualState();
      applyFilters();
    });
  }

  if (salesCheckbox) {
    salesCheckbox.addEventListener("change", (event) => {
      appliedFilters.salesStatus = event.target.checked;
      applyFilters();
    });
  }
});
