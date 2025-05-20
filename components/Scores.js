import React from 'react';

export default function ScoreTable({ scores, rolls, turnsCount, onScore }) {
  const rows = [
    { key: 'ones',    label: 'Ettor' },
    { key: 'twos',    label: 'Tvåor' },
    { key: 'threes',  label: 'Treor' },
    { key: 'fours',   label: 'Fyror' },
    { key: 'fives',   label: 'Femmor' },
    { key: 'sixes',   label: 'Sexor' },
    { key: 'pair',    label: 'Par' },
    { key: 'twoPairs',label: 'Två par' },
    { key: 'threeKind',label:'Tretal' },
    { key: 'fourKind', label: 'Fyrtal' },
    { key: 'fullHouse',label: 'Kåk' },
    { key: 'small',   label: 'Liten stege' },
    { key: 'large',   label: 'Stor stege' },
    { key: 'chance',  label: 'Chans' },
    { key: 'yatzy',   label: 'Yatzy' },
  ];

  return (
    <table style={{ marginTop: 20, borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #999', padding: '5px 10px' }}>Kategori</th>
          <th style={{ border: '1px solid #999', padding: '5px 10px' }}>Poäng</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => {
          const filled = scores[r.key] != null;
          const clickable = !filled && rolls > 0 && turnsCount < 15;

          return (
            <tr key={r.key}>
              <td style={{ border: '1px solid #999', padding: '5px 10px' }}>
                {r.label}
              </td>
              <td
                onClick={() => clickable && onScore(r.key)}
                style={{
                  border: '1px solid #999',
                  padding: '5px 10px',
                  cursor: clickable ? 'pointer' : 'default',
                  background: filled
                    ? '#e0ffe0'
                    : clickable
                    ? '#f9f9f9'
                    : '#fff',
                }}
              >
                {filled ? scores[r.key] : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
