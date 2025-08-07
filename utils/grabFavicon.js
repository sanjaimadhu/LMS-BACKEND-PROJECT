const fetch = require("node-fetch");

exports.grabFavicon = async (url) => {
  let domain = new URL(url);
  domain = domain.hostname.replace("www.", "");
  // http://www.google.com/s2/favicons?domain=${domain}&sz=512
  const response = await fetch(`${url}/favicon.ico`);
  const buffer = await response.arrayBuffer();
  const b64Icon = Buffer.from(buffer).toString("base64");
  return b64Icon;
};
