const signupToKakao = (nickname: string) => {
  const uri = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_SIGNUP_REDIRECT_URI}&response_type=code&state=${encodeURIComponent(nickname)}`;
  window.location.href = uri;
};

export default signupToKakao;
