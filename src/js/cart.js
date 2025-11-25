const CART_LOCAL_STORAGE_KEY = "cartLocalStorageKey";

export const getCartProducts = () => {
  const cartProducts = localStorage.getItem(CART_LOCAL_STORAGE_KEY);

  if (!cartProducts) {
    return [];
  }

  return JSON.parse(cartProducts);
};

const isSameProduct = (product1, product2) => {
  return (
    product1.size === product2.size &&
    product1.name === product2.name &&
    product1.color === product2.color
  );
};

export const addProductToCart = (productToAdd) => {
  const cartProducts = getCartProducts();

  const existingCartProductIndex = cartProducts.findIndex((cartProduct) => {
    return isSameProduct(cartProduct, productToAdd);
  });

  let newCartProducts = [...cartProducts];

  if (existingCartProductIndex >= 0) {
    const existingCartProduct = newCartProducts[existingCartProductIndex];

    newCartProducts[existingCartProductIndex] = {
      ...existingCartProduct,
      quantity: existingCartProduct.quantity + 1,
    };
  } else {
    newCartProducts = [
      ...cartProducts,
      {
        ...productToAdd,
        quantity: 1,
      },
    ];
  }

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCartProducts));

  refreshProductCartsBadge();
};

export const removeProductFromCart = (productToRemove) => {
  const cartProducts = getCartProducts();

  let updatedProducts = [...cartProducts];

  if (productToRemove.quantity === 1) {
    updatedProducts = cartProducts.filter(
      (cartProduct) => !isSameProduct(cartProduct, productToRemove),
    );
  } else {
    const existingCartProductIndex = cartProducts.findIndex((cartProduct) => {
      return isSameProduct(cartProduct, productToRemove);
    });

    updatedProducts[existingCartProductIndex] = {
      ...productToRemove,
      quantity: productToRemove.quantity - 1,
    };
  }

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));

  refreshProductCartsBadge();
};

export const clearAllSameProducts = (productToRemove) => {
  const cartProducts = getCartProducts();

  let updatedProducts = cartProducts.filter(
    (cartProduct) => !isSameProduct(cartProduct, productToRemove),
  );

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));

  refreshProductCartsBadge();
};

export const clearCart = () => {
  localStorage.removeItem(CART_LOCAL_STORAGE_KEY);

  refreshProductCartsBadge();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getProductsCount = (products) => {
  let productsCount = 0;

  for (const product of products) {
    productsCount += product.quantity;
  }

  return productsCount;
};

const createEmptyCartRow = () => {
  const row = document.createElement("tr");

  const td = document.createElement("td");
  td.colSpan = "6";
  td.className = "cart-table__text-empty-cart";
  td.textContent = "Your cart is empty. Use the catalog to add new items.";

  row.appendChild(td);

  return row;
};

const createCartRow = (product, productTotal) => {
  const row = document.createElement("tr");
  row.className = "cart-table__row";

  const tdImage = document.createElement("td");
  tdImage.className = "cart-table__cell cart-table__cell--image";

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.name;
  tdImage.appendChild(img);

  const tdName = document.createElement("td");
  tdName.className = "cart-table__cell";
  tdName.textContent = product.name;

  const tdPrice = document.createElement("td");
  tdPrice.className = "cart-table__cell";
  tdPrice.textContent = `$${product.price}`;

  const tdQuantity = document.createElement("td");
  tdQuantity.className = "cart-table__cell cart-table__cell--quantity";

  const buttonMinus = document.createElement("button");
  buttonMinus.className = "quantity-btn";
  buttonMinus.textContent = "-";

  const quantityParagraph = document.createElement("p");
  quantityParagraph.className = "quantity-paragraph";
  quantityParagraph.textContent = product.quantity;

  const buttonPlus = document.createElement("button");
  buttonPlus.className = "quantity-btn";
  buttonPlus.textContent = "+";

  tdQuantity.appendChild(buttonMinus);
  tdQuantity.appendChild(quantityParagraph);
  tdQuantity.appendChild(buttonPlus);

  const tdTotal = document.createElement("td");
  tdTotal.className = "cart-table__cell cart-table__cell--total";
  tdTotal.textContent = `$${productTotal}`;

  const tdDelete = document.createElement("td");
  tdDelete.className = "cart-table__cell cart-table__cell--delete";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";

  const deleteImg = document.createElement("img");
  deleteImg.src = "../assets/images/cart-bin.svg";
  deleteImg.alt = "Delete";

  deleteButton.appendChild(deleteImg);
  tdDelete.appendChild(deleteButton);

  buttonPlus.addEventListener("click", () => {
    addProductToCart(product);
    renderCartProducts();
  });

  buttonMinus.addEventListener("click", () => {
    removeProductFromCart(product);
    renderCartProducts();
  });

  deleteButton.addEventListener("click", () => {
    clearAllSameProducts(product);
    renderCartProducts();
  });

  row.appendChild(tdImage);
  row.appendChild(tdName);
  row.appendChild(tdPrice);
  row.appendChild(tdQuantity);
  row.appendChild(tdTotal);
  row.appendChild(tdDelete);

  return row;
};

export const refreshProductCartsBadge = () => {
  const badgeContainer = document.querySelector(".user-cart-badge");

  if (!badgeContainer) {
    return;
  }

  const badgeNumber = badgeContainer.querySelector("p");

  if (!badgeNumber) {
    return;
  }

  const cartProducts = getCartProducts();
  const count = getProductsCount(cartProducts);

  if (count === 0) {
    badgeContainer.style.display = "none";
  } else {
    badgeContainer.style.display = "flex";
    badgeNumber.textContent = count;
  }
};

export const renderCartProducts = () => {
  const cartProductsList = document.getElementById("cart-products-list");

  if (!cartProductsList) {
    return;
  }

  const cartProducts = getCartProducts();

  cartProductsList.innerHTML = "";

  if (cartProducts.length === 0) {
    const emptyRow = createEmptyCartRow();
    cartProductsList.appendChild(emptyRow);

    updateCheckoutSummary(0);

    return;
  }

  let allCartProductsPrice = 0;

  cartProducts.forEach((product) => {
    const productTotal = product.price * product.quantity;
    allCartProductsPrice += productTotal;

    const row = createCartRow(product, productTotal);

    cartProductsList.appendChild(row);
  });

  updateCheckoutSummary(allCartProductsPrice);
};

export const updateCheckoutSummary = (allCartProductsPrice) => {
  const shipping = 30;

  const shippingElement = document.getElementById("shipping");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  const shouldApplyDiscount = allCartProductsPrice >= 3000;

  if (shippingElement) {
    shippingElement.textContent = `$${shipping}`;
  }

  if (subtotalElement) {
    subtotalElement.textContent = `$${allCartProductsPrice}`;
  }

  if (shouldApplyDiscount) {
    const discountElement = document.getElementById("discount");
    const discount = allCartProductsPrice * 0.1;
    const discountGroupElements = document.querySelectorAll(
      ".checkout-summary__discount",
    );

    discountGroupElements.forEach((discountGroupElement) => {
      discountGroupElement.style.display = "flex";
    });

    if (discountElement) {
      discountElement.textContent = `$${discount}`;
    }

    if (totalElement) {
      const allCartProductsPriceAfterDiscount = allCartProductsPrice * 0.9;

      totalElement.textContent = `$${allCartProductsPriceAfterDiscount + shipping}`;
    }
  } else {
    const discountGroupElements = document.querySelectorAll(
      ".checkout-summary__discount",
    );

    discountGroupElements.forEach((discountGroupElement) => {
      discountGroupElement.style.display = "none";
    });

    if (totalElement) {
      totalElement.textContent = `$${allCartProductsPrice + shipping}`;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderCartProducts();

  const clearCartButton = document.getElementById("clear-shopping-cart-button");

  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      clearCart();
      renderCartProducts();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const cartProducts = getCartProducts();

      if (cartProducts.length === 0) {
        return;
      }

      clearCart();
      renderCartProducts();
      window.alert("Thank you for your purchase.");
    });
  }
});
