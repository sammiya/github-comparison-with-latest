type RepositoryParams = {
  owner: string;
  repo: string;
};

const getRepositoryParamsIfValidUrl = (
  url: string
): RepositoryParams | undefined => {
  const match = url.match(
    /^https:\/\/github.com\/([^/]+)\/([^/]+)\/pull\/\d+$/
  );
  if (!match) return;

  const [owner, repo] = match.slice(1);
  return {
    owner,
    repo,
  };
};

const buildCompareUrl = (
  { owner, repo }: RepositoryParams,
  from: string,
  to: string
) => `https://github.com/${owner}/${repo}/compare/${from}...${to}`;

const getCurrentBranchName = () => {
  const currentBranchElement = document
    .getElementById("partial-discussion-header")
    ?.querySelector(".gh-header-meta")
    ?.getElementsByClassName("commit-ref")?.[1];
  if (!(currentBranchElement instanceof HTMLElement)) return;

  return currentBranchElement.innerText;
};

const content = () => {
  const repositoryParams = getRepositoryParamsIfValidUrl(window.location.href);
  if (!repositoryParams) return;

  const currentBranchName = getCurrentBranchName();
  if (!currentBranchName) return;

  document
    .querySelectorAll<HTMLElement>(
      "div.TimelineItem-badge + div .Details .d-flex.flex-auto > div.text-right.ml-1"
    )
    .forEach((commitHashElement) => {
      const url = buildCompareUrl(
        repositoryParams,
        commitHashElement.innerText,
        currentBranchName
      );
      commitHashElement.insertAdjacentHTML(
        "beforeend",
        `<a href='${url}'>!</a>`
      );
    });
};

export default content;
