const isTargetUrl = () => {
  // unimplemented
  return true;
};

const getCurrentBranchName = () => {
  const currentBranchElement = document
    .getElementById("partial-discussion-header")
    ?.querySelector(".gh-header-meta")
    ?.getElementsByClassName("commit-ref")?.[1];
  if (typeof currentBranchElement != "object") return;
  const { innerText } = currentBranchElement as { innerText?: unknown };
  if (typeof innerText !== "string") return;
  return innerText;
};

const content = () => {
  if (!isTargetUrl()) return;

  const currentBranchName = getCurrentBranchName();
  if (!currentBranchName) return;

  console.log(`Okay, detected current branch name: ${currentBranchName}`);
};

export default content;
