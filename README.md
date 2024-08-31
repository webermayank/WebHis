🚀 Chrome Extension: Enhanced URL History & Search Query Extraction

📋 Table of Contents
Project Overview
Features
Screenshots
Installation
Usage
APIs & Technologies Used
Contributing
License
📖 Project Overview
Chrome Extension: Enhanced URL History & Search Query Extraction is a lightweight and powerful Chrome extension that allows users to easily track their browsing history with search query extraction. The extension automatically stores URLs visited by the user, displays only the relevant search queries from URLs, and offers a simple interface for managing the history.

Key Objectives:

Provide users with a clean and clear view of their browsing activities.
Extract and display the search queries from complex URLs.
Allow users to manage their browsing history directly within the extension.
🌟 Features
Persistent URL Storage: Stores URLs persistently using IndexedDB, even across sessions and after tabs are closed.
Search Query Extraction: Extracts search queries from URLs to simplify and enhance the browsing history.
User-Friendly Interface: Interactive and clean UI built using Bootstrap.
History Management: Easily clear the browsing history with the click of a button.
Real-Time Data: The extension updates in real-time as new URLs are visited, ensuring that users have up-to-date history.
🖼️ Screenshots



🛠️ Installation
Clone this repository:

bash
Copy code
git clone https://github.com/yourusername/chrome-extension-url-history.git
Navigate to the directory:

bash
Copy code
cd chrome-extension-url-history
Install Dependencies (if any):

bash
Copy code
npm install
Load the Extension in Chrome:

Open Chrome and go to chrome://extensions/
Enable Developer Mode in the top-right corner.
Click on Load unpacked and select the project folder.
The extension will now be installed!
🎯 Usage
After installing the extension, click on the extension icon in the Chrome toolbar.
The popup will display a list of URLs with search queries extracted, along with the timestamps of when the URLs were visited.
Use the Clear History button to remove all stored URLs.
Visit new sites, perform searches, and watch your history update in real-time!
📚 APIs & Technologies Used
Chrome Extensions API
chrome.tabs API: Used to monitor tab updates and capture URL information.
chrome.runtime API: Facilitates messaging between the background script and the popup.
IndexedDB
Persistent client-side storage for storing and managing the user's browsing history data.
Bootstrap 5
Used for styling the UI, ensuring responsiveness and modern design.
JavaScript (ES6)
Core logic for the extension, including event handling, URL extraction, and storage management.
HTML/CSS
Structuring and styling the popup interface.
Other Tools & Libraries
URLSearchParams API: To extract search query parameters from URLs.
🛠️ Key Functions & Code Highlights
Background Script
Handles URL capturing, storage in IndexedDB, and managing messages between the popup and background script.

js
Copy code
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    storeUrlIndexedDB(tabId);  // Store URL in IndexedDB on tab update
  }
});
Popup Script
Displays the extracted URLs and search queries to the user, provides real-time updates, and allows clearing history.

js
Copy code
chrome.runtime.sendMessage({ action: "getUrlHistory" }, (response) => {
  // Display URL history with search query extraction
});
💡 Contributing
Contributions are welcome! To contribute:

Fork the repository
Create a new branch
Make your changes
Submit a pull request
For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
