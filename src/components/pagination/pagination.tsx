import React from 'react';
import { PaginationProps } from '../interfaces';
import PrimaryButton from '../buttons/primaryButton';

function Pagination(props: PaginationProps) {
    const {data, recordsPerPage, currentPage, setCurrentPage} = props;
    
    const npage = Math.ceil(data.length / recordsPerPage);
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
      };

  return (
    
    <div className="flex items-center justify-center mt-6 space-x-4">
        <PrimaryButton title='Anteriores' onClickfunction={prevPage}/>
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
        <PrimaryButton title='Siguientes' onClickfunction={nextPage}/>
    </div>  
  )
}

export default Pagination;