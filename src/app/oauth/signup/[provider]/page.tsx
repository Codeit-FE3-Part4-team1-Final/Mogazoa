import classNames from 'classnames/bind';
import SignupToKakao from '@/components/OAuth/SignupToKakao';
import { OauthProvider } from '@/types/types';
import styles from './OAuthSignup.module.scss';

const cx = classNames.bind(styles);

interface Props {
  params: { provider: OauthProvider };
}

export default function OAuthSignup({ params: { provider } }: Props) {
  return (
    <section className={cx('wrapper')}>
      {provider === OauthProvider.kakao ? <SignupToKakao /> : null}
    </section>
  );
}
