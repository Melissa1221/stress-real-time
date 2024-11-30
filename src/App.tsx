import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './shared/utils/routes';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Questionnaire from './pages/Questionnaire';
import WelcomeQuestionnaire from './pages/WelcomeQuestionnaire';
import History from './pages/History';
import Form from './pages/Form';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.WELCOME} element={<Welcome />} />
        <Route path={ROUTES.QUESTIONNAIRE} element={<Questionnaire />} />
        <Route path={ROUTES.WELCOME_QUESTIONNAIRE} element={<WelcomeQuestionnaire />} />
        <Route path={ROUTES.HISTORY} element={<History />} />
        <Route path={ROUTES.FORM} element={<Form />} />
        <Route path={ROUTES.RESULTS} element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
