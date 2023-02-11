import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';
import { useParams } from 'react-router-dom';

export const FormDetail = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState({});
  const [questionsOptions, setQuestionsOptions] = useState([]);

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
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const options = await apiRequest
      .get('/question_options.php')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    setForm(form);
    setQuestions(questions);
    setQuestionsOptions(options);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getOptions = (id) => {
    return questionsOptions?.filter((option) => option.question_id === id) || [];
  };

  return (
    <Page>
      <h4 className='text-center mb-3'>{form.name}</h4>
      {questions.map((question) => (
        <div className='card mb-3' key={question.id}>
          <div className='card-header'>{question.name}</div>
          <div className='card-body'>
            <div className='d-flex'>
              <div className='pe-2'>
                <b>Type:</b> {question.type}
              </div>
              <div className='pe-2'>
                <b>Required:</b> {question.isRequired ? 'yes' : 'no'}
              </div>
              <div className='pe-2'>
                {' '}
                <b>Filter: </b>
                {question.isFilter ? 'yes' : 'no'}
              </div>
            </div>
            <div className='d-flex'></div>
          </div>
        </div>
      ))}
    </Page>
  );
};
