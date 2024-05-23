<div align='center'>
  <img width='300px' src='public/images/logo-L.svg' />
</div>

<br /><br />

# 💻 프로젝트 개요

<img src='public/images/readme1.png'>

<p>음악, 식당, 영화, 강의, 여행지, 전자기기, 호텔, 와인, 옷, 앱 등 다양한 분야의 상품을 리뷰하는 플랫폼</p>

### 🔧 배포링크

> [Mogazoa](https://mogazoa4-1.vercel.app/)

<br /><br />

# 👪 팀원 소개

<table>
    <tr align="center">
        <td><img width="150" src='https://avatars.githubusercontent.com/u/152246452?v=4' /></td>
        <td><img width="150" src='https://avatars.githubusercontent.com/u/85405709?v=4' /></td>
        <td><img width="150" src='https://avatars.githubusercontent.com/u/151587265?v=4' /></td>
        <td><img width="150" src='https://avatars.githubusercontent.com/u/122016324?v=4'/></td>
    </tr>
    <tr align="center">
      <td><a href="https://github.com/Song-Sang">송상훈</a></td>
      <td><a href="https://github.com/siyeol97">이시열</a></td>
      <td><a href="https://github.com/whtjdrud">조성경</a></td>
      <td><a href="https://github.com/Crack-Egg">이재명</a></td>
    </tr>
    <tr align="center">
      <td>팀장</td>
      <td>팀원</td>
      <td>팀원</td>
      <td>팀원</td>
    </tr>
</table>

<br /><br />

# 📆 개발 기간

### 2024.04.11 ~ 2024.05.17 (약 5주)

<br /><br />

# ✨ 기술 스택

### 개발

<div>
  <img height='26px' src='https://img.shields.io/badge/nextjs14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/react-3178C6?style=for-the-badge&logo=react&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/sass-cc6699?style=for-the-badge&logo=sass&logoColor=white' />
</div>

<br />

### 라이브러리

<div>
  <img height='26px' src='https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/nprogress-006600?style=for-the-badge&logo=nprogress&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/zustand-f7a4ad?style=for-the-badge&logo=zustand&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/classnames-031b4e?style=for-the-badge&logo=classnames&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/reactquery-05d58b?style=for-the-badge&logo=query&logoColor=white' />
</div>

<br />

### 협업

<div>
  <img height='26px' src='https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white' />
  <img height='26px' src='https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white' />
</div>

### 배포 URL

<img height='26px' src='https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white' />

<br /><br />

# ⚙️ 주요 기능

### 📄 메인페이지 및 로그인/회원가입 페이지

- UX/UI 개선을 위한 메인페이지 제작
- 카테고리별 상품 조회
- 카카오 간편 로그인/회원가입

### 📄 상품 상세 페이지

- 카카오톡 공유, 찜, url 복사 기능
- 상품 정보 배열에 저장해 각각 카드 컴포넌트로 구현
- server action을 이용하여 상품 추가 및 삭제 기능 구현
- TopScroll 컴포넌트로 맨 위로 이동

### 📄 프로필 페이지

- 유저 프로필 페이지 SSR 적용
- useMutation을 이용하여 유저 팔로우/팔로우 취소 기능 구현
- react-hook-form을 이용하여 유저 프로필 정보 수정 기능 구현
- useInfiniteQuery를 이용하여 유저 프로필 내 상품 목록 무한 스크롤 기능 구현
- server action을 이용하여 로그아웃 기능 구현

### 📄 비교하기 페이지

- 상품 별 좋아요, 찜, 리뷰에 대한 상품 비교 기능
- localStorage에 저장한 상품 값 변경할 때마다 업데이트(상품 유지)
- 상품이 이미 등록되어있다면 비교 모달이 교체 모달로 변경
- 승리 상품 카드 컴포넌트로 자세히 보여주기

### 📄 공통

- Zustand를 이용한 모달창의 전역 상태 관리
- 카카오톡 간편 회원가입/로그인/공유 기능 구현
- react-query를 이용한 API 호츌
- nprogress 라이브러리를 이용한 페이지 렌더링 상태 구현
- 상품 추가 및 수정 모달
- scss 변수 분리(globals/main/mixins)

<br /><br />

# ⛓️ 추가기능

- UX/UI 개선을 위한 스켈레톤 UI 추가
- 페이지 렌더링 상태를 보여주기 위한 Nprogress 라이브러리 기능 추가

<br /><br />
