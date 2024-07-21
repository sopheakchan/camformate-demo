import React from 'react'
import Card from './Card'

export const HomeJobCard = ({ items = [] }) => {
  return (
    <div className="grid grid-cols-[repeat(8,270px)] gap-10 w-10/12 overflow-hidden overflow-x-scroll p-4">
      {items.map((item, index) => {
        return (
          <Card
            key={index}
            icon={item.icon}
            title={item.title}
            subTitle={item.subTitle}
            amount={item.amount}
            link={item.link}
          />
        )
      })}
    </div>
  )
}
