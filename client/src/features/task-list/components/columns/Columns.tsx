import React, { use } from 'react';
import Column from './column/Column';
import { longFetch } from '../../api/longFetch';

const Columns = () => {
  const testLoading = use(longFetch);
  return (
    <section className="flex justify-between gap-5 flex-1 py-3 overflow-x-auto">
      <Column />
      <Column />
      <Column />
    </section>
  );
};

export default Columns;
