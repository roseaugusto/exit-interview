import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';
import { useParams } from 'react-router-dom';

export const AddOrUpdateForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState({});

  const fetchData = async () => {
    const form = await apiRequest
      .get(`/form.php?id=${id}`)
      .then((res) => {
        return res.data[0] || {};
      })
      .catch((error) => {
        console.log(error);
      });

    const questions = await apiRequest
      .get(`/question.php?isList=true&id=${form.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setForm(form);
    setQuestions(questions);
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
      <h4 className='text-center mb-3'>{form.name}</h4>
      <form>
        <div className='mb-4'>
          <h6>Name</h6>
          <input type='text' className='form-control' value='' />
        </div>
        <div className='mb-4'>
          <h6>Add Question</h6>
          <div className='row g-3 mb-4'>
            <div className='col'>
              <label className='form-label'>Question</label>
              <input type='text' className='form-control' placeholder='What is your name?' />
            </div>
            <div className='col'>
              <label className='form-label'>Type</label>
              <select className='form-select'>
                <option selected>Select Option</option>
                <option>text</option>
                <option>radio</option>
                <option>checkbox</option>
                <option>date</option>
                <option>textarea</option>
              </select>
            </div>
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary mb-2'>Add option</button>
            <div className='d-grid gap-3'>
              <div className='mb-3 row'>
                <div className='col-sm-11'>
                  <input type='text' className='form-control' />
                </div>
                <button className='col-sm-1 btn btn-danger'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Page>
  );
};
