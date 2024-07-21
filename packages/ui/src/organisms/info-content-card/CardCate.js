// import React from 'react'
// import { InfoCard } from './InfoCard'
// import { Images } from '../../../../../apps/client/assets'
// import { useState, useEffect } from 'react'

// export const CardCate = ({ search }) => {
//   const [allInformations, setInformations] = useState([])
//   const [loading, setLoading] = useState(false);

//   const getAllInformations = async (limit, page) => {
//     try {
//       const url = `http://localhost:4000/api/v1/informations?page=${page}&limit=${limit}${search && `&q=${search}`}}`
//       // const url = `http://localhost:4000/api/v1/informations?q=${search}`
//       // / const url = `http://localhost:4000/api/v1/informations?q=${search}`
      
//       const res = await fetch(url)
//       const data = await res.json()
//       console.log('data', data)
//       setInformations(data.data)
//       console.log(allInformations)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     const limit = new URL(window.location).searchParams.get('limit')
//     const page = new URL(window.location).searchParams.get('page')
//     getAllInformations(limit, page)
//   }, [search])
 
//   return allInformations.length === 0 ? (
//     <p>Laoding......</p>
//   ) : (
//     <div className="max-w-[1200px] mx-auto flex flex-wrap gap-16 p-8 justify-center items-center">
//       {allInformations.map((information, index) => {
//         return <InfoCard data={information} key={index} />
//       })}
//     </div>
//   )
// }
// //  return (
// //   <div className="max-w-[1200px] mx-auto flex flex-wrap gap-16 p-8 justify-center items-center">
// //     {items.map((item, index) => {
// //         return <InfoCard data={item} key={index} />
// //       })}
// //   </div>
// // )
