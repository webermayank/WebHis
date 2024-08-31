document.addEventListener("DOMContentLoaded", () => {
  const somewhereElement = document.querySelector(".horizontal-list");
  const deleteHis = document.querySelector(".first-click");

  // Function to calculate "time ago"
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${Math.floor(seconds)} seconds ago`;
  }

  chrome.runtime.sendMessage({ action: "getUrlHistory" }, (response) => {
    console.log("Received response in popup.js:", response);

    if (!response || !response.data) {
      somewhereElement.innerHTML =
        "<li class='list-item'>Failed to retrieve URL history.</li>";
      return;
    }

    const urls = response.data;

    if (urls.length === 0) {
      somewhereElement.innerHTML =
        "<li class='list-item'>No URLs visited yet.</li>";
      return;
    }

    const historyHtml = urls
      .reverse()
      .map(
        (entry) => `
            <li class="list-item">
                <div class="card custom-card">
                    <div class="card-body">
                        <h5 class="card-title">${entry.query || entry.url}</h5>
                        <p class="card-text">Visited: ${timeAgo(
                          entry.visitedAt
                        )}</p>
                        <a href="${
                          entry.url
                        }" target="_blank" class="btn btn-primary">Visit</a>
                    </div>
                </div>
            </li>
        `
      )
      .join("");

    somewhereElement.innerHTML = historyHtml;
  });

  deleteHis.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clearUrlHistory" }, (response) => {
      if (response && response.success) {
        console.log("URL history cleared.");
        somewhereElement.innerHTML =
          "<li class='list-item'>URL history cleared.</li>";
      } else {
        console.error("Failed to clear URL history:", response.message);
        somewhereElement.innerHTML =
          "<li class='list-item'>Failed to clear URL history.</li>";
      }
    });
  });
});
