## Readme Documentation for Albion Market Search

This is a simple React web application that searches the Albion Online Market and displays statistics on the queried item. The application uses data fetched from the Albion Online Data Project API, which provides real-time market data for Albion Online.

### Getting Started
1. Clone the repository to your local machine.
2. Open a terminal and navigate to the root directory of the project.
3. Run `npm install` to install the required dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and navigate to `http://localhost:5173/` to view the application.

### Usage
1. Enter the name of the item you want to search for in the search bar. You can also search for enchanted items using the "@" symbol followed by the enchantment level(s) you are interested in. For example, if you want to search for Adept's Dual Swords at enchantment levels 1, 2, 3, and 4, you would enter "Adept's Dual Sword@1 or 2 or 3 or 4".
2. The application will display the item name, image, and market statistics for each city where the item is traded.
3. If no results are found, a message will be displayed indicating that no results were found.

### Dependencies
- React
- moment

### Acknowledgments
This application was created using the Albion Online Data Project API, which provides real-time market data for Albion Online. The application is meant to serve as a simple example of how to use the API to create a web application that interacts with the Albion Online market.