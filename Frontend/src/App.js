import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './public/css/main.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import DataPage from './components/pages/DataPage';
import RegistrationPage from './components/pages/RegistrationPage';
import NavbarApp from './components/NavbarApp';
import ErrorPage from './components/pages/ErrorPage';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarApp />
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route index element={<RegistrationPage />} />
                        <Route path="/data" element={<DataPage />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
