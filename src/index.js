import { initSlider } from "./slider/slider";
import { initCategories } from "./books/categories";
import { updateCart } from "./cart/cart";

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initCategories();
  updateCart();
});
