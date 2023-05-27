import { initBooks } from "./books";

const categories = [
  { title: "Architecture", sub: "Architecture" },
  { title: "Art & Fashion", sub: "Art" },
  { title: "Biography", sub: "Biography & Autobiography" },
  { title: "Business", sub: "Business" },
  { title: "Crafts & Hobbies", sub: "Crafts & Hobbies" },
  { title: "Drama", sub: "Drama" },
  { title: "Fiction", sub: "Fiction" },
  { title: "Food & Drink", sub: "Cooking" },
  { title: "Health & Wellbeing", sub: "Health & Fitness" },
  { title: "History & Politics", sub: "History" },
  { title: "Humor", sub: "Humor" },
  { title: "Poetry", sub: "Poetry" },
  { title: "Psychology", sub: "Psychology" },
  { title: "Science", sub: "Science" },
  { title: "Technology", sub: "Technology" },
  { title: "Travel & Maps", sub: "Travel" },
];

export function initCategories() {
  const categoryList = document.querySelector("#category-list");

  categories.forEach((category, index) => {
    const categoryIdx = `category-item-${index}`;
    const li = document.createElement("li");

    li.innerText = category.title;
    li.id = categoryIdx;
    li.className = "list_item";
    li.addEventListener("click", () => {
      selectCategory(category.sub, categoryIdx);
    });

    categoryList.appendChild(li);
  });

  const selectCategory = (subject, categoryIdx) => {
    const actives = categoryList.querySelectorAll(".active");

    actives.forEach((el) => el.classList.remove("active"));
    categoryList.querySelector(`#${categoryIdx}`).classList.add("active");

    initBooks(subject);
  };

  selectCategory("Architecture", "category-item-0");
}
