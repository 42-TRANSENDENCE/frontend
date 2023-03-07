import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import { QueryClient, QueryClientProvider } from 'react-query';
import {gameSocket, GameContext} from '../..//contexts/GameSocket'


const LogIn = loadable(() => import('../../pages/LogIn/LogIn'));
const LoginCheck = loadable(() => import('../../pages/LoginCheck/LoginCheck'));
const SignUp = loadable(() => import('../../pages/SignUp/SignUp'));
const Home = loadable(() => import('../Home/Home'));
const Chat = loadable(() => import('../../pages/Chat/Chat'));
const Game = loadable(() => import('../../pages/Game/Game'));
const TwoFactor = loadable(() => import('../../pages/TwoFactor/TwoFactor'));
// const LogIn = loadable(() => import('@ pages/LogIn'));
// const Home = loadable(() => import('@layouts/Home'));

const queryClient = new QueryClient();
const App = () => {
  // const accessToken = getCookies('access_token');
  // const twoFactorChecked = getCookies('two_factor_auth');

  // if (!accessTocken)
  //  return ();
  // if (!twoFactorChecked)
  //   return ();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <GameContext.Provider value={gameSocket}> 
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/logincheck" element={<LoginCheck />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/twofactor" element={<TwoFactor />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Router>
      </GameContext.Provider>
      </div>
    </QueryClientProvider>
    </div>
  );
};

export default App;


// import React from 'react';
// import loadable from '@loadable/component';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// const LogIn = loadable(() => import('../../pages/LogIn/LogIn'));
// const LoginCheck = loadable(() => import('../../pages/LoginCheck/LoginCheck'));
// const SignUp = loadable(() => import('../../pages/SignUp/SignUp'));
// const Home = loadable(() => import('../Home/Home'));
// const Chat = loadable(() => import('../../pages/Chat/Chat'));
// const Game = loadable(() => import('../../pages/Game/Game'));
// const TwoFactor = loadable(() => import('../../pages/TwoFactor/TwoFactor'));

// function getCookies(name: string): string | undefined {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts. length === 2) {
//     return parts.pop()?.split(';').shift();
//   }
// }

// interface PrivateRouteProps {
//   component: React.ComponentType<any>;
//   path: string;
//   accessToken?: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, accessToken, ...rest }) => {
//   if (!accessToken) {
//     return <Navigate replace to="/login" />;
//   }

//   return <Route {...rest} element={<Component accessToken={accessToken} />} />;
// };

// const App: React.FC = () => {
//   const accessToken = getCookies('access_token');
//   const twoFactorChecked = getCookies('two_factor_auth');

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate replace to="/login" />} />
//           <Route path="/login" element={<LogIn />} />
//           <Route path="/logincheck" element={<LoginCheck />} />
//           <Route path="/signup" element={<SignUp />} />
//           <PrivateRoute path="/home" accessToken={accessToken} component={Home} />
//           <PrivateRoute path="/chat" accessToken={accessToken} component={Chat} />
//           <PrivateRoute path="/game" accessToken={accessToken} component={Game} />
//           <Route path="/twofactor" element={<TwoFactor />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

