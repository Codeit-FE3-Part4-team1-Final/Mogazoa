import NavigationBar from '@/components/NavigationBar';
import PasswordInput from '@/components/SignInput/PasswordInput';

export default function SignInPage() {
  return (
    <>
      <NavigationBar />
      <PasswordInput labelName='비밀번호' />
    </>
  );
}
