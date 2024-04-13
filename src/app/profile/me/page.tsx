import Button from '@/components/Button';

export default function page() {
  return (
    <main>
      <div>profile page</div>
      <Button width='640px' height='65px' category='primary'>
        리뷰 작성하기
      </Button>
      <Button width='640px' height='65px' category='primary' disabled>
        리뷰 작성하기
      </Button>
      <Button width='440px' height='55px' category='secondary'>
        비교하기
      </Button>
      <Button width='440px' height='55px' category='secondary' disabled>
        비교하기
      </Button>
      <Button width='335px' height='50px' category='tertiary'>
        편집하기
      </Button>
      <Button width='335px' height='50px' category='tertiary' disabled>
        편집하기
      </Button>
    </main>
  );
}
