import React, { useState, useEffect } from 'react';
import { Page } from './Page';
import { apiRequest } from '../utils/apiRequest';
import { useParams } from 'react-router-dom';

export const AddOrUpdateForm = () => {
  const question = {
    id: null,
    name: '',
    type: 'text',
    formid: null,
    placeholder: '',
    isRequired: 0,
    isFilter: 0,
    options: [],
    existOptions: [],
    delOptions: [],
  };

  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState([question]);
  const { id } = useParams();

  const fetchData = async () => {
    const form = await apiRequest
      .get(`/form/${id}`)
      .then((res) => {
        return res.data || {};
      })
      .catch((error) => {
        console.log(error);
      });

    setForm(form);

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

    const arr = [];
    questions.map((q) => {
      let a = { ...question };
      a.id = q.id;
      a.name = q.name;
      a.type = q.type;
      a.formid = q.form_id;
      a.placeholder = q.placeholder;
      a.isRequired = q.isRequired;
      a.isFilter = q.isFilter;

      let o = options.filter((item) => item.question_id === q.id);

      o.length > 0 && (a.existOptions = o);
      arr.push(a);
    });

    setQuestions(arr);
  };

  useEffect(() => {
    id && fetchData();
  }, []);

  const handleOnChange = (key, value, i) => {
    const q = [...questions];
    if (key === 'options') {
      value = value.split(',').map((item) => item.trim());
      q[i] = { ...q[i], [key]: value };
    } else if (key === 'delOptions') {
      let optionIndex = [...q[i]['delOptions']].findIndex((item) => item === value);
      if ([...q[i]['delOptions']].length === 0 || optionIndex > -1) {
        value = [...q[i]['delOptions'], value];
        q[i] = { ...q[i], delOptions: value };

        let exValues = [...q[i]['existOptions']].filter(
          (item) => !q[i]['delOptions'].includes(item.id),
        );

        q[i] = { ...q[i], existOptions: exValues };
      }
    } else {
      if (key === 'isRequired' || key === 'isFilter') {
        value = value === 'true' ? 1 : 0;
      }
      q[i] = { ...q[i], [key]: value };
    }
    setQuestions(q);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, question]);
  };

  const removeQuestion = (i) => {
    const q = [...questions];
    q.splice(i, 1);
    setQuestions(q);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(questions);
    if (id) {
      await apiRequest
        .patch(`question/${form.id}`, {
          form: {
            name: form.name,
            questions: questions,
          },
        })
        .then(() => {
          alert('successfully updated the form');
          window.location.href = '/forms';
        });
    } else {
      await apiRequest
        .post('question', {
          form: {
            name: form.name,
            questions: questions,
          },
        })
        .then(() => {
          alert('successfully created a form');
          window.location.href = '/forms';
        });
    }
  };

  const hasResponse = () => {
    if (id) {
      if (form.responses) {
        if (form.responses.length > 0) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Page>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <h5>Form Name</h5>
          <input
            type='text'
            className='form-control'
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
        </div>
        <div className='mb-5'>
          {questions.map((key, index) => (
            <React.Fragment key={index}>
              {questions.length > 1 && !hasResponse() && (
                <button
                  type='button'
                  className='btn btn-danger me-4 mb-2'
                  onClick={() => removeQuestion(index)}
                >
                  Delete
                </button>
              )}
              <div className='row g-3 mb-4 mb-3'>
                <div className='col'>
                  <h6 className='form-label'>Question {index + 1}</h6>
                  <input
                    type='text'
                    className='form-control'
                    value={key.name}
                    onChange={(e) => handleOnChange('name', e.target.value, index)}
                  />
                </div>
                <div className='col'>
                  <label className='form-label'>Type</label>
                  <select
                    className='form-select'
                    name={key.name}
                    value={key.type}
                    onChange={(e) => handleOnChange('type', e.target.value, index)}
                  >
                    <option value='text'>text</option>
                    <option value='radio'>radio</option>
                    <option value='checkbox'>checkbox</option>
                    <option value='textarea'>textarea</option>
                  </select>
                </div>
              </div>
              <div className='row g-3 mb-4'>
                <div className='col'>
                  <label className='form-label'>Is this field required?</label>
                  <div className='form-control form-check-inline' key={index}>
                    <input
                      className='form-check-input'
                      type='radio'
                      name={`required${index}`}
                      value={true}
                      checked={key.isRequired === 1}
                      onChange={(e) => handleOnChange('isRequired', e.target.value, index)}
                    />
                    <label className='form-check-label mx-2'>Yes</label>
                    <input
                      className='form-check-input'
                      type='radio'
                      name={`required${index}`}
                      value={false}
                      checked={key.isRequired === 0}
                      onChange={(e) => handleOnChange('isRequired', e.target.value, index)}
                    />
                    <label className='form-check-label ms-2'>No</label>
                  </div>
                </div>
                <div className='col'>
                  <label className='form-label'>Is this field a filter?</label>
                  <div className='form-control form-check-inline' key={index}>
                    <input
                      className='form-check-input'
                      type='radio'
                      name={`filter${index}`}
                      value={true}
                      checked={key.isFilter === 1}
                      onChange={(e) => handleOnChange('isFilter', e.target.value, index)}
                    />
                    <label className='form-check-label mx-2'>Yes</label>
                    <input
                      className='form-check-input'
                      type='radio'
                      name={`filter${index}`}
                      value={false}
                      checked={key.isFilter === 0}
                      onChange={(e) => handleOnChange('isFilter', e.target.value, index)}
                    />
                    <label className='form-check-label ms-2'>No</label>
                  </div>
                </div>
              </div>
              {(key.type === 'radio' || key.type === 'checkbox') && (
                <div className='mb-3'>
                  <h6>Options</h6>
                  <span className='fst-italic text-danger text-sm'>* Existing Options</span>
                  {id &&
                    key.existOptions.length > 0 &&
                    key.existOptions.map((o, i) => (
                      <div className='d-grid gap-3 w-50' key={i}>
                        <div className='mb-3 row'>
                          <div className='col-sm-11'>
                            <input type='text' className='form-control' value={o.name} disabled />
                          </div>
                          {!hasResponse() && (
                            <button
                              type='button'
                              className='col-sm-1 btn btn-danger'
                              onClick={() => handleOnChange('delOptions', o.id, index)}
                            >
                              X
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  <span className='fst-italic text-danger text-sm'>
                    * Please add options separated by comma ex. (orange,red,green,blue)
                  </span>
                  <textarea
                    className='form-control'
                    placeholder='orange,red,green,blue'
                    onChange={(e) => handleOnChange('options', e.target.value, index)}
                  ></textarea>
                </div>
              )}{' '}
              <hr />
            </React.Fragment>
          ))}
          <button className='btn btn-primary mb-5' onClick={(e) => addQuestion(e)}>
            +
          </button>
          <br />
          <button className='btn btn-primary' type='submit'>
            submit
          </button>
        </div>
      </form>
    </Page>
  );
};
