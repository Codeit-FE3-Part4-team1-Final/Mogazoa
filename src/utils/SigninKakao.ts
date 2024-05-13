const signToKakao = () => {
  const uri = `${process.env.NEXT_PUBLIC_SIGNIN_REDIRECT_URI}`;
  window.Kakao.Auth.authorize({
    redirectUri: uri,
  });
};

export default signToKakao;
