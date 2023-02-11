import React from 'react';

export const Radio = ({
  label = 'text',
  value = {
    answerid: null,
    questionid: null,
    answer: null,
    answerOptionId: null,
  },
  options = [],
  handleOnChange,
}) => {
  return (
    <div className='mb-4'>
      <h6>{label}</h6>
      {options.map((key, index) => (
        <div className='form-check form-check-inline' key={index}>
          <input
            className='form-check-input'
            type='radio'
            name={label}
            value={key.id}
            onChange={(e) => handleOnChange(value.questionid, 'answerOptionId', e.target.value)}
          />
          <label className='form-check-label'>{key.name}</label>
        </div>
      ))}
    </div>
  );
};
