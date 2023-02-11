import React from 'react';

export const Text = ({
  label = 'text',
  value = {
    answerid: null,
    questionid: null,
    answer: '',
    answerOptionId: null,
  },
  handleOnChange,
}) => {
  return (
    <div className='mb-4'>
      <h6>{label}</h6>
      <input
        type='text'
        className='form-control'
        value={value.answer}
        onChange={(e) => handleOnChange(value.questionid, 'answer', e.target.value)}
      />
    </div>
  );
};
