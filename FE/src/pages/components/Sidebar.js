import React from 'react';
import { apiRequest } from '../../utils/apiRequest';

export const Sidebar = ({ isAdmin }) => {
  const logout = async () => {
    await apiRequest.post('logout', {}).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    });
  };
  return (
    <>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 text-white ${
          isAdmin ? 'bg-primary-indigo' : 'bg-main-student'
        } sidebar d-none d-lg-block`}
        style={{ width: '280px' }}
      >
        <a
          href='/'
          className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
        >
          <span className='fs-4'>Exit Interview</span>
        </a>
        <hr />
        <ul className='nav nav-pills flex-column mb-auto'>
          {isAdmin ? (
            <>
              <li>
                <a href='/admin/dashboard' className='nav-link text-white'>
                  Dashboard
                </a>
              </li>
            </>
          ) : null}
          <li>
            <a href='/forms' className='nav-link text-white'>
              Forms
            </a>
          </li>
          {isAdmin ? (
            <li>
              <a href='/users' className='nav-link text-white'>
                Users
              </a>
            </li>
          ) : null}
        </ul>
        <hr />
        <h5 onClick={logout}>Logout</h5>
      </div>
    </>
  );
};
