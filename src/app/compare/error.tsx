export default function ComparePageError({
  reset,
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error.message);
  return (
    <div>
      <div>
        <div>
          <h2>알 수 없는 오류가 발생했습니다.</h2>
        </div>
        <div>
          <button type='button' onClick={() => reset()}>
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
