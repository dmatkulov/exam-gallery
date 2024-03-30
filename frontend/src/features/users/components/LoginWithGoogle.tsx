import { googleLogin } from '../usersThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { GoogleLogin } from '@react-oauth/google';
import { routes } from '../../../utils/constants';

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate(routes.home);
  };
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            void googleLoginHandler(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.log('Login failed');
        }}
      />
    </>
  );
};

export default LoginWithGoogle;
