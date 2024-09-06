export const trimUrl = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

export const validateTweetUrl = (url: string) => {
  // https://x.com/txtdarisugab/status/1827225775751500025, must be a twitter url, with x.com as the domain
  // x.com/{username}/status/{id}
  // use regex to validate the url

  const regex = /https:\/\/(twitter\.com|x\.com)\/\w+\/status\/(\d{19})/;
  return regex.test(url);
};

export const getTweetId = (url: string) => {
  const regex = /https:\/\/(twitter\.com|x\.com)\/\w+\/status\/(\d{19})/;
  const match = url.match(regex);

  if (!match) {
    throw new Error("Invalid tweet url");
  }

  if (match.length < 3) {
    throw new Error("Invalid tweet url");
  }

  return match[2];
};
