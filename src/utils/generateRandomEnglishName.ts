const generateRandomEnglishName = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let randomString = '';
  for (let i = 0; i < length; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomString;
};

export default generateRandomEnglishName;
