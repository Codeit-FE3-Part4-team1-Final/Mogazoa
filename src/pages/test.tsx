/* eslint-disable*/

import nookies from 'nookies';

export async function getServerSideProps(context: any) {
  // 쿠키에서 accessToken 읽기
  const cookies = nookies.get(context);
  const accessToken = cookies.accessToken;

  // accessToken을 기반으로 사용자 로그인 상태 확인 (예시)
  // 실제 구현에서는 토큰의 유효성을 검증하는 로직이 필요합니다.
  let isLoggedIn = false;
  if (accessToken) {
    // 예시: 토큰 유효성 검증 로직
    isLoggedIn = true;
  }

  // 페이지 컴포넌트에 props로 로그인 상태 전달
  return {
    props: {
      isLoggedIn,
    },
  };
}

// 페이지 컴포넌트
export default function YourPage({ isLoggedIn }: any) {
  return (
    <div>
      {isLoggedIn ? <p>로그인 상태입니다.</p> : <p>로그인이 필요합니다.</p>}
    </div>
  );
}
