# Requirements for the project. Suitcase e-shop: Multi-page online store.

## Goal:
Your task is to create a fully responsive, multi-page e-commerce website based on a provided Figma design template. This project challenges you to implement advanced HTML, CSS, and JavaScript concepts. You are required to avoid using JavaScript frameworks (e.g., React, Angular) or CSS frameworks (e.g., Bootstrap). The task is quite complex and may take approximately **40 hours**.

## Data and assets:
- Follow the Figma design template, but perfect-pixel accuracy isn't required.
- The data for the application is provided in JSON format (`src/assets/data.json` file).

## Website structure:
The website should include key pages such as:

- **Homepage** with featured products in a carousel and highlighted categories.
- **Catalog** page with filtering, sorting, and pagination features.
- Single **Product Details** page providing detailed information about a selected product.
- **About Us** page containing details about the company and its team members
- **Contact Us** page with a functional form.
- **Cart** page where users can add, update, or remove products.

You will use the Figma template as the single source of truth for your design. Align the website's structure, styles, and components with the design specifications provided.


## Stages to implement the project:
The stages you will go through as you complete the project – as well as the requirements for each stage – are described below. Carefully review all the theoretical information for each stage before starting the project.

### **Stage 1.** Setting up the project
Start by creating a Git repository in `autocode.git.epam.com`. Click the "Start" button to fork a predefined template into your project space. Then, complete the following steps to set up your project:
- Clone the repository locally, then run `npm install` inside it to install dependencies from package.json.
- Add SASS into your project and implement a `compile` script to the `package.json` file to handle the compilation of all `.scss` files into `.css` files, placed in separate `dist` folder. If you’re unfamiliar with how to compile .scss files into .css, please refer to the [guide](https://sass-lang.com/guide/). 
**!!Note, styles for all pages are included only after the compilation process.**
- Add a description to a `README.md` file. It should contain clear instructions on how to set up and run your project, including prerequisites (e.g., `npm install` and SASS compilation process).
**!!Note, the project should be run using only two scripts: `npm install` (to install dependencies) and `npm run dev` (to compile and launch the project).**

### **Stage 2.** Implementing the layout (HTML + CSS)
Begin building the layout for each page based on the Figma template. Follow these guidelines:
- Create semantic HTML markup using tags like `<header>`, `<footer>`, `<article>`, `<nav>`, `<ul>`, `<li>`, etc., for structured content organization.
- Implement styles using SASS: utilize mixins, variables, and SASS inheritance to simplify and organize styles.
- Use Flexbox and / or CSS Grid for advanced layouts.
- Style global components (e.g., buttons, input fields, links) and reusable elements with Sass by using organized partial files (`_buttons.scss`, `_forms.scss`, etc.).
- Ensure the design remains consistent with the Figma mockup for typography, spacing, and colors.
- Ensure the website header is **sticky** and remains fixed at the top of the viewport while scrolling.


### **Stage 3.** Responsive Design
**Goal**: Ensure the website works seamlessly across mobile, tablet, and desktop.

**Requirements**:
- Use breakpoints (defaults: 768px, 1024px, 1440px).
- No horizontal scrolling at any resolution.
- Maintain readable font sizes and comfortable spacing at all breakpoints.
- Layouts must work in portrait and landscape orientations.
- Test cross-browser compatibility (at least in Chrome and Firefox).
- Images and videos must be responsive and maintain aspect ratio.
- Ensure navigation adapts for mobile (hamburger menu or equivalent).

### **Stage 4.** Interactivity & Functionality (JavaScript)
**General Features:**


| **Item**             | **Description**                                                                                                                                 |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Header Navigation** | - Clicking the `Best Shop` logo navigates to the homepage (`index.html`).                                                                        |
|                       | - Hovering over a menu item changes the text color to `#B92770`.                                                                               |
|                       | - Clicking a menu item navigates to the corresponding page.                                                                                   |
| **Footer Navigation** | - Footer is displayed on every page as per the design.                                                                                        |
|                       | - Clicking `About Us` or `Contact Us` navigates to their respective pages.                                                                    |
| **Account Icon**      | - Clicking the icon opens the `Log In` modal window, that closes upon successful completion.                                                                                            |
|                       | - In the `Log In` window:                                                                                                                       |
|                       |   - Email field must follow a RegEx format.                                                                                                   |
|                       |   - Password field is required.                                                                                                               |
|                       | - Include a show/hide password toggle using an eye icon.                                                                                      |
| **Cart Icon**         | - Clicking the icon opens the `Cart` page in the same window.                                                                                   |
|                       | - The cart counter updates in real-time when items are added or removed.                                                                      |


**Pages:**   
**1. Homepage**:
- The `Travel Suitcases` block includes an image slider, where images display hover effects such as zoom and shadow. A random text should be displayed over a background image. 
- `Selected Products` and `New Products Arrival` are loaded from local JSON.
- Clicking `Add to Cart` button:
    - Instantly updates the cart counter in the Header Cart icon.
    - Saves the product to LocalStorage.
    - Selecting a Product card directs the user to the Product Details page.

**2. Catalog Page**

| **Feature**    | **Description**                                                                                                                                              |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Filtering**  | - Filters work with local JSON data.                                                                                                                         |
|                 | - Keys and values for filtering:                                                                                                                            |
|                 |   - `category`: "carry-ons", "suitcases", "luggage sets", "kids' luggage"                                                                                   |
|                 |   - `color`: "red", "blue", "green", "black", "grey", "yellow", "pink"                                                                                      |
|                 |   - `size`: "S", "M", "L", "XL", "S-L", "S, M, XL"                                                                                                          |
|                 |   - `salesStatus`: true / false                                                                                                                             |
|                 | - Reset button returns all settings to their default values.                                                                                                |
|                 | - Filters are displayed as dropdown menus that open when hovered over.                                                                                      |
|                 | - The chosen filter is visually highlighted.                                                                                                                |
| **Sorting**    | - Arrange items by price (lowest to highest).                                                                                                                |
|                 | - Arrange items by price (highest to lowest).                                                                                                               |
|                 | - Arrange items by popularity, starting with the most popular.                                                                                              |
|                 | - Arrange items by rating, starting with the highest.                                                                                                       |
| **Search**     | - Searches are conducted within local JSON data only.                                                                                                        |
|                 | - If the product is found, the `Product Details` page will open.                                                                                              |
|                 | - If the product is not found, a "Product not found" pop-up will be displayed.                                                                              |
| **Pagination** | - Display 12 products per page.                                                                                                                              |
|                 | - Add previous/next buttons.                                                                                                                                |
|                 | - Load pages asynchronously (no reload).                                                                                                                    |
|                 | - Dynamically show "Showing X–Y of Z results". |
| **Top Best Sets** | - Shows random suitcase  sets.                                                                                                                              |                                                                                                             |

**3. Product Details Page**:
- Load dynamically from local JSON data. 
- The product page should follow the Figma layout. For different products, only the name, rating, price, and main image should change, reflecting the product the user clicked on and was redirected to.
- Quantity selector (`+/-`): minimum value is 1.
- `Add to Cart`: updates header counter and LocalStorage.
- `Review` tab: On form's Submit show success or error message upon submission without reloading the page.
- `You May Also Like` displays 4 randomly selected JSON products.


**4. About Us Page**:
- Clicking `See All Models` opens the `Catalog` page.

**5. Contact Us Page**:

| **Feature**           | **Description**                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------|
| **Real-time Validation** | - Validate email format in real time.                                                         |
|                        | - Ensure required fields are filled.                                                           |
| **On Submit**          | - Show success or error message upon submission without reloading the page.                    |

**6. Cart Page**:  

| **Feature**        | **Description**                                                                                                      |
|---------------------|----------------------------------------------------------------------------------------------------------------------|
| **Add Items**       | - Merge entries and update quantity if name, size, and color match.                                                 |
|                     | - Keep separate entries if only the name matches.                                                                  |
|                     | - The total price and counter are updated accordingly.                                                             |
| **Update Items**    | - Quantity +/- panel updates immediately.                                                                          |
|                     | - Total price recalculated instantly.                                                                              |
| **Remove Items**    | - The remove button deletes a product from the list.                                                               |
|                     | - The total price and counter are updated accordingly.                                                             |
| **Clear Cart**      | - Deletes all items.                                                                                               |
|                     | - Displays "Your cart is empty. Use the catalog to add new items."                                                 |
|                     | - The cart counter in the Header Cart icon is not visible.                                                        |
| **Checkout**        | - Clears cart.                                                                                                     |
|                     | - Shows "Thank you for your purchase."                                                                             |
|                     | - The cart counter in the Header Cart icon is not visible.                                                        |
| **Prices & Discounts** | - Prices are fetched from JSON.                                                                                  |
|                     | - Apply discount rules if set in data. A 10% discount is applied when the total sum exceeds $3,000.                                                                             |
| **Persistence**     | - Store all cart data in LocalStorage.                                                                             |



**Final notes**:
- Ensure your web application combines HTML, CSS, and JavaScript smoothly for a functional and engaging user experience.
- Test your application on multiple browsers and devices to ensure it works properly and looks good everywhere.
- Write clean, well-organized code that is easy to maintain and reuse.
- Avoid “magic numbers” — use CSS variables for colors, spacing, breakpoints.



### **Stage 5.** Project compilation, verification and submission
Once your project is complete, take the following steps to ensure quality and submit it for evaluation:

**Quality control**:
- Add linters: Set up ESLint for JavaScript and Stylelint for Sass/CSS to maintain consistent code quality and style.
- Linting script: Add a `lint` script to your package.json to check both `.js` and `.scss` files for issues. Fix any problems detected.

**Verification**:
- Verify that your project is fully functional. Projects that are not running or functional will not be evaluated.
- Push all changes to the remote repository and ensure everything is up to date, including configurations, scripts, and the `README.md` file.
- Double-check that the date of your last commit does not exceed the project deadline.

**Submitting your project**:
- Commit all your changes and ensure they are present in the remote repository.
- Submit the project before the deadline.
- Wait for your evaluation score.
