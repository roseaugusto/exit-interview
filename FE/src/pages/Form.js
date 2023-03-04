import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';

export const Form = () => {
  const [forms, setForms] = useState([]);
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    setUser(JSON.parse(localStorage.getItem('user') || {}));
  };

  const fetchData = async () => {
    await apiRequest
      .get('/form')
      .then((res) => {
        setForms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = async (id) => {
    await apiRequest
      .delete(`/form/${id}`)
      .then((res) => {
        alert('successfully deleted');
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchData();
  }, []);

  return (
    <Page>
      <div className='d-flex flex-row justify-content-between mb-3'>
        <form className='w-50 me-2'>
          <input type='text' className='form-control' placeholder='search' />
        </form>
        {user.isAdmin ? (
          <a href='/form/add'>
            <button className='btn btn-primary'>+ Add</button>
          </a>
        ) : null}
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            {user.isAdmin ? <th scope='col'>Number of Responses</th> : null}
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
                <a href={`/survey/${key.id}/responses`}>{key.name}</a>
              </td>
              {user.isAdmin ? (
                <td>{key.responses && key.responses.length ? key.responses.length : '-'}</td>
              ) : null}
              <td className='d-flex'>
                {user.isAdmin ? (
                  <>
                    <a href={`/form/${key.id}/update`}>
                      <button className='btn btn-success btn-sm px-4 mx-2'>Update</button>
                    </a>
                    <button
                      className='btn btn-danger btn-sm px-4 mx-2'
                      onClick={() => deleteData(key.id)}
                      disabled={key.responses && key.responses.length > 0}
                    >
                      Delete
                    </button>
                  </>
                ) : null}
                {!user.isAdmin && (
                  <a href={`/survey/${key.id}`}>
                    <button className='btn btn-warning btn-sm px-4 mx-2'>Submit Response</button>
                  </a>
                )}
              </td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};
