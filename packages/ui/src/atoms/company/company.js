import React from 'react'
import aba from '../../../assets/images/aba.png'
import Image from 'next/image'
import Link from 'next/link'

const company = () => {
  return (
    <div className="w-[500px] shadow-lg flex gap-3">
      <Image src={aba} width={80} height={80} alt="aba image" />
      <div>
        <p className="text-md">ABA Bank</p>
        <p className="text-sm text-gray-500">Phnom Penh</p>
        <Link href="#" className="mt-5">
          8 New Positions
        </Link>
      </div>
    </div>
  )
}

export default company
