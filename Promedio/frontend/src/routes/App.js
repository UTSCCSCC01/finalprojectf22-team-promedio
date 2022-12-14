import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import styled from 'styled-components'
import { isAuthUserValid }from '../utils/validate';
import { Navbar } from '../components/Navbar';
import { authRoutes } from '../utils/config';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [authUser, setAuthUser] = React.useState(undefined);
  const navigate = useNavigate();

  const isRouteAuth = (route) => {
    // for every route in authRoutes, check if the route included
    // in the current url is in authRoutes
    for (let i = 0; i < authRoutes.length; i++) {
      if (route.includes(authRoutes[i])) {
        return true;
      }
    }
    return false;
  }

  React.useEffect(() => {
    // get authUser from localStorage
    const localUser = localStorage.getItem('authUser');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      if (isAuthUserValid(parsedUser)) {
        setAuthUser(parsedUser);
        if (!isRouteAuth(window.location.pathname)) {
          navigate('/semesters');
        }
      } else {
        localStorage.removeItem('authUser');
        navigate('/welcome');
      }
    } else {
      navigate('/welcome');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isAuthUserValid(authUser)) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
      if (!isRouteAuth(window.location.pathname)) {
        navigate('/semesters');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <AppContainer>
      <Navbar authUser={authUser} logout={() => {
        setAuthUser(undefined);
        localStorage.removeItem('authUser');
        navigate('/welcome');
      }}/>
      <Outlet context={{
        setAuthUser: setAuthUser,
        authUser: authUser
      }} />
    </AppContainer>
  );
}

export default App;
