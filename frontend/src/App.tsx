import Layout from './components/UI/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { routes } from './utils/constants';
import NotFound from './components/UI/NotFound/NotFound';
import RegisterUser from './features/users/containers/RegisterUser';
import LoginUser from './features/users/containers/LoginUser';
import Gallery from './features/gallery/containers/Gallery';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import UserGallery from './features/gallery/containers/UserGallery';
import NewPhoto from './features/gallery/containers/NewPhoto';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.register} element={<RegisterUser />} />
          <Route path={routes.login} element={<LoginUser />} />
          <Route path={routes.home} element={<Gallery />} />
          <Route
            path={routes.userHomePage + '/:id'}
            element={<UserGallery />}
          />

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
