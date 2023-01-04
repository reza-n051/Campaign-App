import { Route, Routes } from 'react-router-dom';
import AuthRequired from './components/AuthRequired';
import AdminAuthRequired from './components/AdminAuthRequired';
import Footer from './components/Footer';
import Header from './components/Header';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RulesPage from './pages/RulesPage';
import SearchPage from './pages/SearchPage';
import SignupPage from './pages/SignupPage';
import CreateKarzarPage from './pages/CreateKarzarPage';
import UserKarzarsPage from './pages/UserKarzarsPage';
import EditProfilePage from './pages/EditProfilePage';
import KarzarPage from './pages/KarzarPage';
import AdminPanelPage from './pages/AdminPanelPage';
import AdminPanelLoginPage from './pages/AdminPanelLoginPage';
function App() {
  return (
    <div className='flex flex-col mx-auto bg-gray-100 w-full sm:w-4/5 xl:w-3/5'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/karzars">
          <Route path=":id" element={<KarzarPage />} />
          <Route path='*' element={<p>404</p>} />
        </Route>
        <Route path="/profile">
          <Route path=":username" element={<AuthRequired><ProfilePage /></AuthRequired>}>
            <Route path="view-karzars" element={<AuthRequired><UserKarzarsPage /></AuthRequired>} />
            <Route path="create-karzar" element={<AuthRequired><CreateKarzarPage /></AuthRequired>} />
            <Route path="edit-profile" element={<AuthRequired><EditProfilePage /></AuthRequired>} />
            <Route path='*' element={<p>404</p>} />

          </Route>
        </Route>
        <Route path="/admin" element={<AdminAuthRequired><AdminPanelPage /></AdminAuthRequired>} />
        <Route path="/admin-login" element={<AdminAuthRequired><AdminPanelLoginPage /></AdminAuthRequired>} />
        <Route path='*' element={<p>404</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
