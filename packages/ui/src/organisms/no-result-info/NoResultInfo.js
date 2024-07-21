import React from 'react'
import Image from 'next/image'
import { noResult } from '../../../assets'

export const NoResultInfo = ()=> {
  return (
    
    <div className='flex flex-col items-center '>  
      <Image src={noResult} width={200} heigth={200} alt='image' className=''/>
      <div className='text-center'>
        <div className='text-[45px] text-primary font-serif'> No Result Found</div>
        <div className='text-[20px] text-gray-500 font-serif'>We cannot find what you are searching for.</div>
        <div className='text-[20px] text-gray-500 font-serif '>Please try to search again. </div>
      </div> 
    </div>
    
  )
}
