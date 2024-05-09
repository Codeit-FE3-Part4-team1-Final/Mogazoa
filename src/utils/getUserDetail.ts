const getUserDetail = async (id: string, token?: string) => {
  const option: RequestInit = token
    ? {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }
    : { cache: 'no-store' };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/users/${id}`,
      option,
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
        cache: 'no-store',
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('failed to get user data');
  }
};

export { getUserDetail, getMyDetail };
