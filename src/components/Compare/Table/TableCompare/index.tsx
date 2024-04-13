interface TableCompareInterface {
  SubjectProduct: any;
  ObjectProduct: any;
  handleCount: (value: number) => void;
  showVictoryProduct: (value: string) => void;
}

export default function TableCompare({
  SubjectProduct,
  ObjectProduct,
  handleCount,
  showVictoryProduct,
}: TableCompareInterface) {
  const SubjectProductFavorite = SubjectProduct?.favoriteCount;
  const SubjectProductReview = SubjectProduct?.reviewCount;
  const SubjectProductRating = SubjectProduct?.rating?.toFixed(1);
  const ObjectProductFavorite = ObjectProduct?.favoriteCount;
  const ObjectProductReview = ObjectProduct?.reviewCount;
  const ObjectProductRating = ObjectProduct?.rating?.toFixed(1);

  const compareCount = (subject, object) => {
    return subject === object ? 0 : subject > object ? 1 : -1;
  };

  const favorite = compareCount(
    SubjectProductFavorite ?? 0,
    ObjectProductFavorite ?? 0,
  );
  const review = compareCount(
    SubjectProductReview ?? 0,
    ObjectProductReview ?? 0,
  );
  const rating = compareCount(
    SubjectProductRating ?? 0,
    ObjectProductRating ?? 0,
  );

  const count = ['favoriteCount', 'reviewCount', 'rating'].map<number>(
    (key) => {
      const SubjectCount = Math.floor(SubjectProduct[key] * 10) / 10;
      const ObjectCount = Math.floor(ObjectProduct[key] * 10) / 10;

      if (SubjectCount > ObjectCount) {
        return 1;
      }
      if (SubjectCount < ObjectCount) {
        return -1;
      }
      return 0;
    },
  );

  const 
}
