const regexEmail: RegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const checkSignEmail = (email: string): string => {
  if (email === '') {
    return '이메일을 입력해주세요';
  }
  if (!regexEmail.test(email)) {
    return '이메일 형식으로 작성해주세요';
  }
  return '';
};

export const checkSignPassword = (password: string): string => {
  if (password === '') {
    return '비밀번호를 입력해주세요';
  }
  if (password.length < 8) {
    return '8자 이상 작성해주세요.';
  }
  return '';
};

export const checkNewPassword = (
  currentPassword: string,
  newPassword: string,
): string => {
  if (newPassword === '') {
    return '비밀번호를 입력해주세요';
  }
  if (newPassword.length < 8) {
    return '8자 이상 작성해주세요.';
  }
  if (currentPassword === newPassword) {
    return '기존 비밀번호와 동일합니다.';
  }
  return '';
};

export const checkPasswordConfirmed = (
  password: string,
  passwordConfirmed: string,
): string => {
  if (passwordConfirmed === '') {
    return '비밀번호를 입력해주세요!';
  }
  if (password !== passwordConfirmed) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

export const checkNickname = (nickname: string): string => {
  if (nickname === '') {
    return '닉네임을 입력해주세요';
  }
  if (nickname.length > 10) {
    return '10자 이하로 작성해주세요';
  }
  return '';
};
