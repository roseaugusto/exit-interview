import React from 'react';

export const Sidebar = () => {
  return (
    <>
      <div
        className='d-flex flex-column flex-shrink-0 p-3 text-white bg-primary-indigo sidebar d-none d-lg-block'
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
          <li>
            <a href='/admin/dashboard' className='nav-link text-white'>
              Dashboard
            </a>
          </li>
          <li>
            <a href='/responses' className='nav-link text-white'>
              Responses
            </a>
          </li>
          <li>
            <a href='/forms' className='nav-link text-white'>
              Forms
            </a>
          </li>
          <li>
            <a href='/users' className='nav-link text-white'>
              Users
            </a>
          </li>
        </ul>
        <hr />
        <h5>Logout</h5>
      </div>
    </>
  );
};
