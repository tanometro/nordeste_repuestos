// const [currentPage, setCurrentPage] = useState(1);

// const recordsPerPage = 10; 
// const lastIndex = currentPage * recordsPerPage;
// const firstIndex = lastIndex - recordsPerPage;
// const dataShow = displayedProducts.slice(firstIndex, lastIndex);
// <Pagination data={displayedProducts} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

import React from 'react';
import { PaginationProps } from './interfaces';
import PrimaryButton from './buttons/primaryButton';

function Pagination(props: PaginationProps) {
  const { data, recordsPerPage, currentPage, setCurrentPage } = props;

  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers: number[] = [];
  for (let i = 1; i <= npage; i++) {
    numbers.push(i);
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id: number) => {
    setCurrentPage(id);
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <PrimaryButton title="Anteriores" onClickfunction={prevPage} />
      {numbers.map((n, i) => (
        <div className="text-black flex items-center" key={i}>
          <button
            onClick={() => changePage(n)}
            className={`text-red mx-2 ${currentPage === n ? 'font-bold' : ''}`}
          >
            {n}
          </button>
        </div>
      ))}
      <PrimaryButton title="Siguientes" onClickfunction={nextPage} />
    </div>
  );
}

export default Pagination;