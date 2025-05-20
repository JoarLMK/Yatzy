import React from 'react';

export default function Dice({ value, held, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 50,
        height: 50,
        fontSize: 24,
        margin: 5,
        backgroundColor: held ? '#ddd' : '#fff',
        cursor: 'pointer',
      }}
    >
      {value}
    </button>
  );
}
