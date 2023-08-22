import { Route, Routes } from 'react-router-dom';
import IndexPage from "./Vista/Paginas/IndexPage.jsx";
import LoginPage from './Vista/Paginas/LoginPage.jsx';
import Registro from './Vista/Paginas/Registro.jsx';
import './App.css';
import Layout from './Vista/Layout.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import AccountPage from './Vista/Paginas/AccountPage.jsx';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
 
  return (
    <UserContextProvider>
      <Routes>
        <Route path = '/' element={<Layout />}>
          <Route index element={<IndexPage />}/> {/*Cuando se dirige a app.jsx route te direcciona a indexpage. Funcionamiento de controlador 'secundario' Index page es la landing page por eso de usa index element*/}
          <Route path = '/login' element={<LoginPage />}/> {/* Se usa path en lugar de index element ya que no es la landing page */}
          <Route path = '/registro' element={<Registro />}/> 
          <Route path = '/account/:subpage?' element={<AccountPage />}/> 
          <Route path = '/account/:subpage/:action' element={<AccountPage />}/> 
         
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App

/* Quede en 3:20:00 */