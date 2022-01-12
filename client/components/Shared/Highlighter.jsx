import React from 'react';

export const Highlighter = ({ string, query }) => {
  if (query.length === 0) {
    return <span>{string}</span>;
  }
  let regex = new RegExp(query, 'gi');
  let matches = [...string.matchAll(regex)].map((x) => x[0]);
  let arr = string.split(regex);

  return arr.map((chunk, i) => (
    <span key={i}>
      {chunk}
      {i !== arr.length - 1 ? <span className='highlighted'>{matches[i]}</span> : <></>}
    </span>
  ));
};
