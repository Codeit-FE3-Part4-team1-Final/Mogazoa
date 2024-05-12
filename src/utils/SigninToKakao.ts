const signinToKakao = () => {
  const uri = `${process.env.NEXT_PUBLIC_SIGNIN_REDIRECT_URI}`;
  window.Kakao.Auth.authorize({
    redirectUri: uri,
  });
};

export default signinToKakao;
