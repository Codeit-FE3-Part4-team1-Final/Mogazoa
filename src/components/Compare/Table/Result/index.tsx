interface ResultInterface {
  count: number;
  victoryProduct: string;
}

export default function Result({ count, victoryProduct }: ResultInterface) {
  return count === 0 ? (
    <div>무승부입니다.</div>
  ) : (
    <div>
      <span>{victoryProduct}</span> 상품이 승리하였습니다.
    </div>
  );
}
