import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';

export const Form = () => {
  const [forms, setForms] = useState([]);

  const fetchData = async () => {
    await apiRequest
      .get('/form.php')
      .then((res) => {
        setForms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const f = [
    {
      id: 1,
      name: 'Whats your name?',
      type: 'text',
      formid: 1,
      options: [],
    },
  ];
  return (
    <Page>
      <div className='d-flex flex-row mb-3'>
        <form className='w-100 me-2'>
          <input type='text' className='form-control' placeholder='search' />
        </form>
        <a href='/form/add'>
          <button className='btn btn-primary'>Add</button>
        </a>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col' colSpan='2'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {forms.map((key, index) => (
            <tr key={index}>
              <th scope='row'>{key.id}</th>
              <td>
                <a href={`/form/${key.id}/details`}>{key.name}</a>
              </td>
              <td className='d-flex'>
                <a href={`/form/${key.id}/update`}>
                  <button className='btn btn-success btn-sm px-4 mx-2'>Update</button>
                </a>
                <button className='btn btn-danger btn-sm px-4 mx-2'>Delete</button>
                <a href={`/survey/${key.id}`}>
                  <button className='btn btn-warning btn-sm px-4 mx-2'>Submit Response</button>
                </a>
              </td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};
