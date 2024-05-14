import { ProductDetailType } from '@/types/types';

const handleShareKakao = (productData: ProductDetailType) => {
  const { Kakao, location } = window;
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: productData.name,
      description: productData.description,
      imageUrl: productData.image,
      link: {
        mobileWebUrl: location.href,
        webUrl: location.href,
      },
    },
    social: {
      likeCount: productData.favoriteCount,
      commentCount: productData.reviewCount,
    },
    buttons: [
      {
        title: '확인하러 가기',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    ],
  });
};

export default handleShareKakao;
