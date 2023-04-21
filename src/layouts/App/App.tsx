import loadable from "@loadable/component";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './styles';

import PrivateRoute from './PrivateRoute';
const Socket = loadable(() => import('./Socket'));
const LogIn = loadable(() => import('../../pages/LogIn/LogIn'));
const SignUp = loadable(() => import('../../pages/LogIn/SignUp'));
const TwoFactor = loadable(() => import('../../pages/LogIn/TwoFactor'));
const Home = loadable(() => import('../Home/Home'));
const Chat = loadable(() => import('../../pages/Chat/Chat'));
const Game = loadable(() => import('../../pages/Game/Game'));
const InGame = loadable(() => import('../../pages/Game/Ingame'));

const queryClient = new QueryClient();
const App = () => {
  return (
    <AppContainer>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/twofactor" element={<PrivateRoute component={TwoFactor} />} />
            <Route path="/socket" element={<PrivateRoute component={Socket} />} />
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path="/chat/*" element={<PrivateRoute component={Chat} />} />
            <Route path="/game" element={<PrivateRoute component={Game} />} />
            <Route path="/game/play" element={<PrivateRoute component={InGame} />} />
            <Route path="/*" element={<div>NOTFOUND</div>} />
          </Routes>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme='dark'
          />
        </Router>
      </QueryClientProvider>
    </AppContainer>
  );
};

export default App;
