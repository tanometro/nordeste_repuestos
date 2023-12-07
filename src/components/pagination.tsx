'use client'

import { useState } from 'react'


const Pagination = (data: DataProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10; 
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const 
  return (
    <div className='flex gap-2'>
      
    </div>
  )
}
    

export default Pagination;