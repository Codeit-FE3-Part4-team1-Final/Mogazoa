import Button from '@/components/Button/Button';

export default function page() {
  return (
    <main>
      <div>profile page</div>
      <Button width='185px' height='65px' category='primary'>
        리뷰작성하기
      </Button>
      <Button width='160px' height='65px' category='secondary'>
        비교하기
      </Button>
      <Button width='160px' height='65px' category='tertiary'>
        편집하기
      </Button>
    </main>
  );
}
