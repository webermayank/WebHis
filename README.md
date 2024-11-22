
# 🚀Chrome Extension: Enhanced URL History & Search Query Extraction

Developed a Chrome extension that provides advanced management of browsing history by extracting and displaying search queries from URLs.
Enabling quick catch up to closed tabs by mistake

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Screenshots](##🖼️Screenshots)
4. [Installation](#installation)
5. [Usage](#usage)
6. [APIs & Technologies Used](#apis--technologies-used)
7. [Key Functions & Code Highlights](#key-functions--code-highlights)
8. [Contributing](#contributing)
9. [License](#license)

## 📖 Project Overview 
Chrome Extension: Enhanced URL History & Search Query Extraction is a lightweight Chrome extension that tracks user browsing history, extracts search queries from URLs, and provides a clean UI for managing this data. It stores URLs using IndexedDB for persistence and real-time updates.




## 🌟 Features
- Persistent URL Storage: Stores URLs in IndexedDB, allowing them to persist across sessions.
- Search Query Extraction: Extracts search queries from complex URLs to simplify browsing history.
- History Management: Easily clear the browsing history with the click of a button.
- User-Friendly Interface: Clean and interactive UI built using Bootstrap.
## 🖼️Screenshots


## Clone the repository:

```bash
git clone https://github.com/yourusername/chrome-extension-url-history.git

```

## Navigate to the directory:

```bash
cd chrome-extension-url-history
```

## Install dependencies:
```bash
npm install
```

#### Load the Extension in Chrome:

- Open Chrome and navigate to chrome://extensions/.
- Enable Developer Mode.
- Click on Load unpacked and select the project folder.




## 🎯 Usage

- Click on the extension icon in the Chrome toolbar.
- The popup will display URLs with extracted search queries, alongside their timestamps.
- Use the Clear History button to remove stored URLs.
- Perform searches and observe real-time updates in the history!
## 📚 APIs & Technologies Used
- `Chrome Extensions API`

- `chrome.tabs API`: Tracks tab updates and captures URL data.
- `chrome.runtime API`: Handles messaging between background scripts and popup.
- `IndexedDB`: Client-side database for persistent storage of URLs and related data.

- `Bootstrap 5`: Provides responsive design for the extension’s UI.

- `JavaScript (ES6)`: Core logic including event handling, URL parsing, and storage management.
## 🛠️ Key Functions & Code Highlights

### Background Script

The background script is responsible for capturing the URLs, storing them in IndexedDB, and managing history data.

```javascript

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    storeUrlIndexedDB(tabId);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUrlHistory") {
    // Logic to retrieve history from IndexedDB
  }
});
```
### Popup Script
The popup script retrieves the stored URLs, displays them to the user, and provides the option to clear the history.

```javascript

document.addEventListener("DOMContentLoaded", () => {
  const deleteHis = document.querySelector(".first-click");

  // Fetch URL history and display it
  chrome.runtime.sendMessage({ action: "getUrlHistory" }, (response) => {
    // Logic to render history in popup
  });

  // Clear URL history on button click
  deleteHis.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clearUrlHistory" }, (response) => {
      // Logic to clear history from UI
    });
  });
});
```
### IndexedDB Logic
Storing URLs in IndexedDB for persistence:

```javascript
function storeUrlIndexedDB(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    const url = tab.url;
    const timestamp = new Date().toISOString();

    const transaction = db.transaction(["urls"], "readwrite");
    const objectStore = transaction.objectStore("urls");

    objectStore.add({
      tabId,
      url,
      visitedAt: timestamp,
    });
  });
}
Search Query Extraction
Extracting the search query from a URL for display:

javascript
Copy code
function getSearchQuery(url) {
  try {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);

    // Extract the 'q' parameter from the URL
    const query = searchParams.get('q');

    // If the query exists, return it
    if (query) {
      return query;
    } else {
      return url;  // If no query is found, return the original URL
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return url;  // In case of an error, fallback to showing the full URL
  }
}

// Example usage in your code where URLs are displayed
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUrlHistory") {
    const transaction = db.transaction(["urls"], "readonly");
    const objectStore = transaction.objectStore("urls");

    const allRequest = objectStore.getAll();
    allRequest.onsuccess = function (event) {
      const results = event.target.result.map((entry) => {
        return {
          ...entry,
          query: getSearchQuery(entry.url)  // Extract and display the search query
        };
      });

      sendResponse({ data: results });
    };

    allRequest.onerror = function () {
      sendResponse({ data: [] });
    };

    return true; // Keeps the messaging channel open for async response
  }
});
```
## 💡 Contributing
Contributions are welcome! To contribute:

- Fork the repository
- Create a new branch
- Make your changes
- Submit a pull request
For significant changes, please open an issue to discuss what you'd like to change.
