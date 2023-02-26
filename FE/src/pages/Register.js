import React, { useState } from 'react';
import { apiRequest } from '../utils/apiRequest';

export const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (user.password === user.confirmPass) {
      await apiRequest
        .post('/register', {
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          alert('Successfully Registered');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          if (res.data.user.isAdmin) {
            window.location.href = '/admin/dashboard';
          } else {
            window.location.href = '/forms';
          }
        });
    } else {
      alert('Password does not matched');
    }
  };

  return (
    <div className='min-vh-100 d-flex justify-content-center py-5 bg-main-student'>
      <div className='card w-25 border-0'>
        <div className='card-header p-0'>
          <img
            src='https://www.peninsulapersonnel.com.au/wp-content/uploads/2020/09/Best-HR-Interview-1.png'
            className='card-img-top'
            alt=''
          />
        </div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <h5 className='card-title text-center my-2'>Student Registration</h5>
            <div className='mb-3'>
              <h6>Name</h6>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className='mb-3'>
              <h6>Email</h6>
              <input
                type='email'
                className='form-control'
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className='mb-3'>
              <h6>Password</h6>
              <input
                type='password'
                className='form-control'
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className='mb-3'>
              <h6>Confirm Password</h6>
              <input
                type='password'
                className='form-control'
                onChange={(e) => setUser({ ...user, confirmPass: e.target.value })}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </form>
          <hr />
          <div className='text-center'>
            <a href='/login'>Have an account? Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
};
