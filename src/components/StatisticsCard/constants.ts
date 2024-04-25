const starIcon = '/images/star-icon.svg';
const saveIcon = '/images/save-icon.svg';
const reviewIcon = '/images/review-icon.svg';

type MetricKey = 'rating' | 'favoriteCount' | 'reviewCount';

interface MetricInfo {
  unit: string;
  icon: string;
  label: string;
  metricKey: MetricKey;
}

const TYPE_DATA: Record<string, MetricInfo> = {
  STAR: { unit: '점', icon: starIcon, label: '별점 평균', metricKey: 'rating' },
  SAVE: {
    unit: '개',
    icon: saveIcon,
    label: '좋아요',
    metricKey: 'favoriteCount',
  },
  REVIEW: {
    unit: '개',
    icon: reviewIcon,
    label: '리뷰',
    metricKey: 'reviewCount',
  },
};

export default TYPE_DATA;
