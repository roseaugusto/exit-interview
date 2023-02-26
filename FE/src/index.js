import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Page } from './pages/Page';
import { Survey } from './pages/Survey';
import { Form } from './pages/Form';
import { AddOrUpdateForm } from './pages/AddOrUpdateForm';
import { AdminDashboard } from './pages/AdminDashboard';
import { SurveyResponses } from './pages/SurveyResponses';
import { SurveyResponseDetail } from './pages/SurveyResponseDetail';
import { Users } from './pages/Users';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Page />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />

        <Route path='/forms' element={<Form />} />
        <Route path='/form/:id/update' element={<AddOrUpdateForm />} />
        <Route path='/form/add' element={<AddOrUpdateForm />} />
        <Route path='/users' element={<Users />} />

        <Route path='/survey/:id' element={<Survey />} />
        <Route path='/survey/:id/responses' element={<SurveyResponses />} />
        <Route path='/survey/:id/responses/:user_form_id' element={<SurveyResponseDetail />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
