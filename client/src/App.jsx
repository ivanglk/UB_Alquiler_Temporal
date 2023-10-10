import { Route, Routes } from 'react-router-dom';
import IndexPage from "./Vista/Paginas/IndexPage.jsx";
import LoginPage from './Vista/Paginas/LoginPage.jsx';
import Registro from './Vista/Paginas/Registro.jsx';
import './App.css';
import Layout from './Vista/Layout.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import ProfilePage from './Vista/Paginas/AccountPage.jsx';
import PlacesPage from './Vista/Paginas/PlacesPage.jsx';
import PlacePage from './Vista/Paginas/PlacePage.jsx';
import PlacesFormPage from './Vista/Paginas/PlacesFormPage.jsx';
import BookingsPage from './Vista/Paginas/BookingsPage.jsx';
import BookingPage from './Vista/Paginas/BookingPage.jsx';

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
          <Route path = '/account' element={<ProfilePage />}/> 
          <Route path = '/account/places' element={<PlacesPage />}/> 
          <Route path = '/account/places/new' element={<PlacesFormPage />}/> 
          <Route path = '/account/places/:id' element={<PlacesFormPage />}/>
          <Route path = '/place/:id' element={<PlacePage/>}/>
          <Route path = '/account/bookings' element={<BookingsPage />}/>
          <Route path = '/account/bookings/:id' element={<BookingPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App

/* Quede en 6:00:40 */
