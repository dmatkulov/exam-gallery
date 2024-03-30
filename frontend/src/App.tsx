import Layout from './components/UI/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { routes } from './utils/constants';
import NotFound from './components/UI/NotFound/NotFound';
import RegisterUser from './features/users/containers/RegisterUser';
import LoginUser from './features/users/containers/LoginUser';
import Gallery from './features/photos/containers/Gallery';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import UserHome from './features/photos/containers/UserHome';
import NewPhoto from './features/photos/containers/NewPhoto';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.register} element={<RegisterUser />} />
          <Route path={routes.login} element={<LoginUser />} />
          <Route path={routes.home} element={<Gallery />} />
          <Route path={routes.userHomePage + '/:id'} element={<UserHome />} />

          <Route
            path={routes.newPhoto}
            element={
              <ProtectedRoute
                isAllowed={
                  user && (user.role === 'user' || user.role === 'admin')
                }
              >
                <NewPhoto />
              </ProtectedRoute>
            }
          />

          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
