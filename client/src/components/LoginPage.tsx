import { useCookies } from 'react-cookie';
import LoginForm from './LoginForm';
import { BackgroundBlob } from './tailwind/BackgroundBlob';

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <div className='bg-slate-200 flex h-screen'>
        <div className='m-auto'>
          <BackgroundBlob topOffset={15} leftOffset={0} size={12} bgColorHex='#b2f7eb' />
          <BackgroundBlob topOffset={20} leftOffset={20} size={16} bgColorHex='#abcef7' />
          <BackgroundBlob topOffset={15} leftOffset={80} size={12} bgColorHex='#edc2ff' />
          <BackgroundBlob topOffset={40} leftOffset={85} size={16} bgColorHex='#eeffbf' />
          <BackgroundBlob topOffset={40} leftOffset={10} size={16} bgColorHex='#ebd9c0' />
          <LoginForm />
        </div>
      </div>
    </div >
  );
};

export default LoginPage;