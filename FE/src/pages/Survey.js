import React, { useState, useEffect } from 'react';
import { Text } from './components/Text';
import { Radio } from './components/Radio';
import { Checkbox } from './components/Checkbox';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';
import { useParams } from 'react-router-dom';

export const Survey = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionsOptions, setQuestionsOptions] = useState([]);

  const fetchData = async () => {
    const form = await apiRequest
      .get(`/form/${id}`)
      .then((res) => {
        return res.data || {};
      })
      .catch((error) => {
        console.log(error);
      });

    const questions = await apiRequest
      .get(`/form/${form.id}/questions`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const options = await apiRequest
      .get('/options')
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

  const onSubmit = async () => {
    await apiRequest
      .post(`/answer`, {
        answers: arr,
      })
      .then((res) => {
        alert('Successfully submitted');
        window.location.href = '/forms';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getOptions = (id) => {
    return questionsOptions?.filter((option) => option.question_id === id) || [];
  };

  const answers = {
    answerid: null,
    questionid: null,
    description: null,
    answerOptionId: null,
    formid: id,
  };
  const arr = [];

  const handleOnChange = (id, field, value) => {
    const index = arr.findIndex((key) => key.questionid === id);
    arr[index] = { ...arr[index], [field]: value };
  };

  const getValue = (id) => {
    const index = arr.findIndex((key) => key.questionid === id);
    return arr[index];
  };

  const fields = (key) => {
    arr.push({ ...answers, questionid: key.id });
    switch (key.type) {
      case 'text':
        return <Text label={key.name} value={getValue(key.id)} handleOnChange={handleOnChange} />;
      case 'radio':
        return (
          <Radio
            label={key.name}
            value={getValue(key.id)}
            handleOnChange={handleOnChange}
            options={getOptions(key.id)}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            label={key.name}
            value={getValue(key.id)}
            handleOnChange={handleOnChange}
            options={getOptions(key.id)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Page>
      <h4 className='text-center mb-3'>{form.name}</h4>
      {questions.map((key, index) => (
        <div key={index}>
          <h5>Question {index + 1}</h5> {fields(key)}
        </div>
      ))}
      <button className='btn btn-primary' onClick={onSubmit}>
        submit
      </button>
    </Page>
  );
};
