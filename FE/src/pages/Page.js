import React from 'react';
import './css/common.css';
import './css/page.css';
import { Sidebar } from './components/Sidebar';

export const Page = ({ children }) => {
  return (
    <main className='d-flex flex-nowrap'>
      <Sidebar />
      <div className='b-example-vr bg-main flex-grow-1 p-5'>{children}</div>
    </main>
  );
};
