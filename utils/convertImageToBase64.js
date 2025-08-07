exports.convertImageToBase64 = (buff) => {
  let base64Image = Buffer.from(buff).toString("base64");
  return base64Image;
};
