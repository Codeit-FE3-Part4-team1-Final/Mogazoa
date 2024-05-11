const SigninToKakao = () => {
  window.Kakao.Auth.authorize({
    redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
  });
};

export default SigninToKakao;
