Chrome Extension for Enhanced URL History Tracking and Search Query Extraction

Overview:
Developed a Chrome extension that provides advanced management of browsing history by extracting and displaying search queries from URLs. This extension integrates with Chrome's API to store, retrieve, and manage URLs persistently using IndexedDB, offering users a streamlined view of their browsing activities and search queries.

Key Features:

Persistent URL Storage: Utilizes IndexedDB to save browsing history across browser sessions, ensuring that URL data is retained even after tabs are closed.
Search Query Extraction: Extracts and displays search queries from complex URLs (e.g., Google search results) to provide a clearer view of users’ search activities.
Interactive UI: Implements a user-friendly popup interface that allows users to view their URL history and easily clear it with a single click.
Data Management: Includes functionality to clear all stored URL history through a dedicated button, with real-time updates reflected in the popup UI.
Technical Details:

Frontend: Designed and implemented the extension’s popup interface using HTML, CSS, and Bootstrap, ensuring responsiveness and an intuitive user experience.
Backend: Developed background scripts using JavaScript to handle events, store URLs in IndexedDB, and communicate between the popup and background scripts via Chrome’s messaging API.
URL Processing: Integrated a URL parsing function to extract and display search queries from URLs, improving the readability and relevance of the displayed history.
Event Handling: Managed tab updates and removals to dynamically store and update URL history, while ensuring that URLs are not inadvertently deleted when tabs are closed.
Impact:

Enhanced User Experience: Provided users with a more insightful and manageable view of their browsing history by focusing on search queries and simplifying URL display.
Improved Data Persistence: Ensured that URL history is retained even after browser sessions, giving users consistent access to their browsing data.
Streamlined Management: Enabled easy clearing of browsing history, offering users control over their stored data with a simple and effective interface.
Technologies Used:

JavaScript (ES6): For core logic, event handling, and API interactions.
HTML/CSS: For designing the popup interface and styling.
Bootstrap: For responsive design and UI components.
IndexedDB: For persistent client-side storage of URL history.
Chrome Extensions API: For managing browser events, tab updates, and messaging between scripts.
Skills Demonstrated:

Web extension development and deployment
Client-side storage and data management
User interface design and usability
Integration with browser APIs and event-driven programming
