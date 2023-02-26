import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';
import { useParams } from 'react-router-dom';

export const SurveyResponses = () => {
  const { id } = useParams();
  const [forms, setForms] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const forms = await apiRequest
      .get(`/user-form/${id}`)
      .then((res) => {
        return res.data || [];
      })
      .catch((error) => {
        console.log(error);
      });

    const u = await apiRequest
      .get(`/users`)
      .then((res) => {
        return res.data || [];
      })
      .catch((error) => {
        console.log(error);
      });

    setForms(forms);
    setUsers(u);
  };

  const getUsername = (id) => {
    return users.filter((item) => item.id === id)[0].name;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>
        <tbody>
          {forms.length > 0 ? (
            forms.map((key, index) => (
              <tr key={index}>
                <td>
                  <a href={`/survey/${id}/responses/${key.id}`}>{key.id}</a>
                </td>
                <td>{getUsername(key.user_id)}</td>
                <td>{key.created_at}</td>
              </tr>
            ))
          ) : (
            <tr className='text-center'>
              <td colSpan='3'>No Response/s yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </Page>
  );
};
