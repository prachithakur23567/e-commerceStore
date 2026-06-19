Setup Instructions - To run this project:
1. Clone the repository using "git clone https://github.com/prachithakur23567/E-CommerceWebsite.git". Then install all dependencies using npm install. After that, start the project using npm start.
2. Assumptions made- (i) Assumption is that the filter and the menu button (on the left side of the navbar) is used to toggle the filter section which include category,brand and price.
(ii) Assumption Product Searching is based on Product Category by "search category" and Product Name by "search products".
(iii) Assumption is that filtering of brands is based on the filtering of category of products.
3. Architectural Decisions
Created custom hooks to improve code reusability, maintainability, and separation of concerns:
(i) useFetch – Handles API calls and data fetching logic.
(ii) useProducts – Manages product-related business logic and state.
(iii) useDebounce – Optimizes search functionality by delaying API calls until the user stops typing.
Implemented debouncing in the search feature to reduce unnecessary API requests, improve application performance and provide a smoother user experience during product searches.
Used useMemo to optimize filtering operations by memoizing computed results, preventing unnecessary recalculations and re-renders when the input data remains unchanged.
Organized the project into separate folders for components, hooks, pages, APIs, utilities, and context management to improve readability and maintainability.
It is responsive according to size of tablet screen.
4. Improvements if given more time-
(i) Make the application fully mobile responsive to ensure a seamless experience across all screen sizes and devices.
(ii) Implement functionality for the Add to Cart icon by creating a cart management system that allows users to add, remove, and view products in their cart.
(iii) Implement functionality for the Profile icon by adding user authentication, profile management, and account-related features such as login, registration, and user details management.
