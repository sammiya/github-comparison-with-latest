import content from "./impl/content";

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request !== "complete") return;
  content();
});
