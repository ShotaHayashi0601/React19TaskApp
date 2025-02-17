import React from 'react';
import Column from './column/Column';

const Columns = () => {
  return (
    <section className="flex justify-between gap-5 flex-1 py-3">
      <Column />
      <Column />
      <Column />
    </section>
  );
};

export default Columns;
