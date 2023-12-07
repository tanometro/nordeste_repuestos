import React from 'react';
import { PaginationProps } from '../interfaces';

function Pagination(props: PaginationProps) {
    const {currentPage, setCurrentPage, filteredData, onPageChange} = props;

    const recordsPerPage = 10; 
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const userShow = filteredData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / recordsPerPage);
    const numbers: number[] = [];
        for (let i = 1; i <= npage; i++) {
        numbers.push(i);
    }
    const prevPage = () => {
        if(currentPage !== 1) {
        setCurrentPage(currentPage - 1)
        }
    }; 

    const nextPage = () => {
        if(currentPage !== npage) {
        setCurrentPage(currentPage + 1)
        }
    };

    const changePage = (id: number) => {
        setCurrentPage(id);
        onPageChange(id);
      };

  return (
    
    <div className="flex items-center justify-center mt-6 space-x-4">
        <button
             type="button"
            onClick={prevPage}
            className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            Anteriores
        </button>
        {
            numbers.map((n, i) => (
             <div className='text-black flex items-center'>
                <button
                    key={i}
                    onClick={() => changePage(n)}
                    className={`text-red mx-2 ${currentPage === n ? 'font-bold' : ''}`}
                >
                    {n}
                </button>
            </div>
                ))
        }
        <button
            type="button"
            onClick={nextPage}
            className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            Siguientes
        </button>
    </div>  
  )
}

export default Pagination;