const getUserDetail = async (id: string, token?: string) => {
  const header = token
    ? {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    : {};
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/users/${id}`,
      header,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('failed to get user data');
  }
};

const getMyDetail = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/users/me`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('failed to get user data');
  }
};

export { getUserDetail, getMyDetail };
