const copyCurrentUrl = () => {
  const currentUrl = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => alert('URL이 클립보드에 복사되었습니다.'))
      .catch((err) => alert(`복사에 실패했습니다. 에러: ${err}`));
  } else {
    alert('이 브라우저에서는 클립보드 복사 기능을 지원하지 않습니다.');
  }
};

export default copyCurrentUrl;
