let db;
const request = indexedDB.open("UrlHistoryDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("urls", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("tabId", "tabId", { unique: false });
  objectStore.createIndex("url", "url", { unique: false });
  objectStore.createIndex("visitedAt", "visitedAt", { unique: false });
};

request.onsuccess = function (event) {
  console.log("IndexedDB initialized successfully.");
  db = event.target.result;
};

request.onerror = function (event) {
  console.error("Error initializing IndexedDB:", event.target.error);
};

function storeUrlIndexedDB(tabId) {
  if (!db) return;
  chrome.tabs.get(tabId, (tab) => {
    const currentUrl = tab.url;
    const timestamp = new Date().toISOString();

    const transaction = db.transaction(["urls"], "readwrite");
    const objectStore = transaction.objectStore("urls");

    const request = objectStore.add({
      tabId,
      url: currentUrl,
      visitedAt: timestamp,
    });

    request.onsuccess = function () {
      console.log("URL added to the database:", currentUrl);
    };

    request.onerror = function () {
      console.error("Error adding URL to the database:", request.error);
    };
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    storeUrlIndexedDB(tabId);
  }
});

// Modified to retain URL history even after the tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  if (!db) return;

  const transaction = db.transaction(["urls"], "readwrite");
  const objectStore = transaction.objectStore("urls");

  const index = objectStore.index("tabId");
  const request = index.openCursor(IDBKeyRange.only(tabId));

  request.onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      // Do nothing to prevent deletion of the URL from history
      cursor.continue();
    }
  };

  request.onerror = function () {
    console.error("Error handling tab removal:", request.error);
  };
});

// Extract search query function
function getSearchQuery(url) {
  try {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);

    // Extract the 'q' parameter from the URL
    const query = searchParams.get("q");

    // If the query exists, return it; otherwise, return the original URL
     if (query) {
       return query;
     } else {
       return url; // If no query is found, return the original URL
     }
  } catch (error) {
    console.error("Invalid URL:", error);
    return url; // In case of an error, fallback to the full URL
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUrlHistory") {
    if (!db) {
      sendResponse({ data: [] });
      return true;
    }

    const transaction = db.transaction(["urls"], "readonly");
    const objectStore = transaction.objectStore("urls");

    const allRequest = objectStore.getAll();
    allRequest.onsuccess = function (event) {
      const results = event.target.result.map((entry) => {
        return {
          ...entry,
          query: getSearchQuery(entry.url), // Extract and display the search query
        };
      });

      console.log("URL history with queries retrieved:", results);
      sendResponse({ data: results });
    };

    allRequest.onerror = function () {
      sendResponse({ data: [] });
    };

    return true; // Keeps the messaging channel open for async response
  }

  // Handle clearing of the URL history
  else if (request.action === "clearUrlHistory") {
    if (!db) {
      sendResponse({ success: false, message: "Database not initialized" });
      return true;
    }

    const transaction = db.transaction(["urls"], "readwrite");
    const objectStore = transaction.objectStore("urls");

    // Clear all data from the object store
    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = function () {
      console.log("URL history cleared successfully");
      sendResponse({ success: true });
    };

    clearRequest.onerror = function () {
      console.error("Error clearing URL history");
      sendResponse({ success: false, message: "Error clearing URL history" });
    };

    return true; // Keeps the messaging channel open for async response
  }
});
