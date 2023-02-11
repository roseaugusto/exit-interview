import React, { useState } from 'react';

export const Checkbox = ({
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
  const [origArr, setOrigArr] = useState([]);
  const getIds = (id) => {
    const arr = [...origArr];
    const index = arr.findIndex((arr) => arr === id);
    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }
    setOrigArr(arr);
    handleOnChange(value.questionid, 'answerOptionId', arr);
  };
  return (
    <div className='mb-4'>
      <h6>{label}</h6>
      {options.map((key, index) => (
        <div className='form-check form-check-inline' key={index}>
          <input
            className='form-check-input'
            type='checkbox'
            name={label}
            value={key.id}
            onChange={(e) => getIds(e.target.value)}
          />
          <label className='form-check-label'>{key.name}</label>
        </div>
      ))}
    </div>
  );
};
