import { AxiosRequestConfig } from 'axios';

export type ProductCategory =
  | '음악'
  | '영화/드라마'
  | '강의/책'
  | '호텔'
  | '가구/인테리어'
  | '식당'
  | '전자기기'
  | '화장품'
  | '의류/악세서리'
  | '앱'
  | '없음';

/**
 *  example: 1
 */
export type Id = number;

/**
 * example: https://example.com/...
 *
 * pattern: ^https?://.+
 */
export type UrlType = string;

/**
 * example: 닉네임
 *
 * minLength: 1
 *
 * maxLength: 20
 */
export type Nickname = string;

export interface Category {
  name: ProductCategory;
  id: Id;
}

export interface User {
  updatedAt: string; // date-time
  createdAt: string; // date-time
  teamId: string;
  image: UrlType | null;
  description: string;
  nickname: Nickname;
  id: Id;
}

export interface FolloweeList {
  id: number;
  followee: User;
}

export interface FollowerList {
  id: number;
  follower: User;
}

export interface UserFolloweeList {
  nextCursor: number | null;
  list: FolloweeList[];
}

export interface UserFollowerList {
  nextCursor: number | null;
  list: FollowerList[];
}

export interface UserDetail {
  updatedAt: string; // date-time
  createdAt: string; // date-time
  teamId: string;
  image: UrlType | null;
  description: string;
  nickname: Nickname;
  id: Id;
  mostFavoriteCategory: Category | null;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface UpdateUserRequestBody {
  description: string; // maxLength: 300
  nickname: Nickname; // minLength: 1 maxLength: 20
  image: UrlType;
}

export interface UserRanking {
  updatedAt: string; // date-time
  createdAt: string; // date-time
  teamId: string;
  image: string | null;
  description: string;
  nickName: Nickname;
  id: Id;
  reviewCount: number;
  followersCount: number;
}

export interface ProductListType {
  updatedAt: string; // date-time
  createdAt: string; // date-time
  writerId: Id;
  categoryId: Id;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: UrlType;
  name: string;
  id: Id;
}

export interface Review {
  user: {
    image: string | null;
    nickname: Nickname;
    id: Id;
  };
  reviewImages: {
    source: UrlType;
    id: Id;
  }[];
  productId: Id;
  userId: Id;
  updatedAt: string; // date-time
  createdAt: string; // date-time
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: Id;
}

/**
 * minimum: 1
 *
 * maximum: 5
 */
export type Rating = number;

/**
 * minLength: 1
 *
 * maxLength: 300
 */
export type ReviewContent = string;

export interface CreateReviewRequestBody {
  productId: Id;
  images: UrlType[]; // maxLength: 3
  content: ReviewContent;
  rating: Rating;
}

export interface UpdateReviewRequestBody {
  images: { id?: Id; source?: string }[];
  content: ReviewContent;
  rating: Rating;
}

export interface SearchProductResponse {
  nextCursor: number;
  list: ProductListType[];
}

export interface ProductDetailType {
  updatedAt: string;
  createdAt: string;
  writerId: Id;
  categoryId: Id;
  favoriteCount: number;
  reviewCount: number;
  rating: Rating;
  image: UrlType;
  name: string;
  id: Id;
  categoryMetric: {
    reviewCount: number;
    favoriteCount: number;
    rating: Rating;
  };
  category: Category;
  isFavorite: boolean;
  description: string;
}

/**
 * example: 상품 이름
 *
 * minLength: 1
 *
 * maxLength: 20
 */
export type ProductName = string;

/**
 * example: 상품 설명, 최소 10자 이상, 최대 500자 이하
 *
 * minLength: 10
 *
 * maxLength: 500
 */
export type ProductDescription = string;

export interface CreateProductRequestBody {
  categoryId: Id;
  image: UrlType;
  description: ProductDescription;
  name: ProductName;
}

export interface UpdateProductRequestBody {
  categoryId: Id;
  image: UrlType;
  description: ProductDescription;
  name: ProductName;
}

export interface ListReviewResponse {
  nextCursor: number | null;
  list: Review[];
}

export interface OauthApp {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: Id;
}

export enum OauthProvider {
  google = 'google',
  kakao = 'kakao',
}

/**
 * UpsertOauthAppRequestBody.appKey: 간편 로그인을 위한 인증 키 입니다.
 *
 * Google 의 경우에는 "클라이언트 id" 입니다. Kakao 의 경우에는 "REST API 키" 입니다. 실습을 위해 발급받은 키를 등록해주세요.
 *
 * 실제 서비스에서 사용 하는 키는 등록하시면 안됩니다.
 */
export interface UpsertOauthAppRequestBody {
  appKey: string;
  provider: OauthProvider;
}

export interface FollowRequestBody {
  userId: Id;
}

/**
 * example: example@email.com
 *
 * pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
 */
export type Email = string;

export interface SignUserType {
  updatedAt: string; // date-time
  createdAt: string; // date-time
  teamId: string;
  image: UrlType | null;
  description: string;
  nickname: Nickname;
  id: Id;
  email: Email;
}

export interface SignupResponse {
  accessToken: string;
  user: SignUserType;
}

/**
 * example: password
 *
 * minLength: 8
 *
 * pattern: ^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$
 */
export type Password = string;

export interface SignUpRequestBody {
  passwordConfirmation: Password;
  password: Password;
  nickname: Nickname;
  email: Email;
}

export interface SignInResponse {
  accessToken: string;
  user: SignUserType;
}

export interface SignInRequestBody {
  password: Password;
  email: Email;
}

/**
 * 간편 로그인 과정을 통해 발급받은 토큰입니다.
 *
 * Google 의 경우에는 Google Id 토큰(JWT) 입니다.
 *
 * Kakao 의 경우에는 인가 코드 입니다.
 */
export type OauthToken = string;

/**
 * example: http://localhost:3000/oauth/kakao
 *
 * Kakao 의 경우에는 필수입니다.
 *
 * 인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
 */
export interface SignInWithOauthRequestBody {
  redirectUri: string;
  token: OauthToken;
}

export interface SignUpWithOauthRequestBody {
  nickname: Nickname;
  redirectUri: string;
  token: OauthToken;
}

export const httpMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PATCH: 'patch',
} as const;

export interface RequestMethodInterface<U = unknown> {
  method: (typeof httpMethod)[keyof typeof httpMethod];
  endPoint: string;
  data?: U;
  config?: AxiosRequestConfig;
}

export interface GetQueryInterface {
  keyword?: string | null;
  category?: number | null;
  order?: 'recent' | 'rating' | 'reviewCount' | string;
  cursor?: number | null;
}
