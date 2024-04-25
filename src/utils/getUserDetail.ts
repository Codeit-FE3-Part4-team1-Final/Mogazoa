const getUserDetail = async (id: string) => {
  try {
    const response = await fetch(`${process.env.API_URL_HOST}/users/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getMyDetail = async (token: string) => {
  try {
    const response = await fetch(`${process.env.API_URL_HOST}/users/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getUserDetail, getMyDetail };
