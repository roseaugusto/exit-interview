import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';
import { useParams } from 'react-router-dom';

export const SurveyResponseDetail = () => {
  const { id, user_form_id } = useParams();
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
      <div>User Response Preview</div>
    </Page>
  );
};
