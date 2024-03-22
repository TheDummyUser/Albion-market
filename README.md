# Albion Market React Component

## Overview
The Albion Market React Component is a web application component designed to display market statistics for items in the game Albion Online. It allows users to search for items, select a server region, and view the minimum and maximum sell prices for the selected item across different cities within the chosen server region.

## Features
- **Search Functionality**: Users can search for items by typing their names into the search bar. As the user types, the component dynamically updates the search results based on the input.
- **Server Selection**: Users can choose between two server regions: West and East, using a dropdown menu.
- **Display Item Information**: Once an item is selected, the component displays its image, name, and market statistics for each city where the item is sold.
- **Data Fetching**: Market statistics are fetched from the Albion Online API. The component retrieves information such as minimum and maximum sell prices for the selected item in various cities within the chosen server region.
- **Data Update**: The component refreshes market data every hour to ensure accuracy.
- **Instructions**: Provides instructions for users on how to search for items and interpret the displayed data.
- **No Data Found Handling**: If no data is found for the searched item, a message is displayed informing the user.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **useState**: React hook for managing state within functional components.
- **useEffect**: React hook for performing side effects in functional components.
- **Fetch API**: Used to make HTTP requests to retrieve market data from the Albion Online API.
- **Moment.js**: Library for parsing, validating, manipulating, and displaying dates and times. Used for formatting timestamps in the displayed data.

## Installation
1. Clone the repository: `git clone https://github.com/ThedummyUser/Albion-market.git`
2. Navigate to the project directory: `cd Albion-market`
3. Install dependencies: `npm install`

## Usage
1. Start the development server: `npm start`
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Here are a few ways you can contribute:
- **Bug Fixes**: Find and fix bugs.
- **Enhancements**: Add new features or improve existing ones.
- **Documentation**: Improve the project documentation.
- **Testing**: Write tests to ensure code reliability.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **Albion Online**: The Albion Market React Component relies on the Albion Online API for fetching market data.
- **Open Source Community**: Thanks to all the contributors and maintainers of the open-source libraries used in this project.

## Contact
For any inquiries or support, please contact [Your Name](mailto:youremail@example.com).

---
**Note**: Update placeholders (like `yourusername`, `Your Name`, `youremail@example.com`) with actual information specific to your project.
