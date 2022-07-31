chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
  if (changeInfo.status !== "complete") return;
  chrome.tabs.sendMessage(tabId, "complete");
  return true;
});
