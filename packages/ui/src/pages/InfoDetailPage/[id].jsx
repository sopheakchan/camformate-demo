// import { useRouter } from "next/router";
// import React from "react";
// import { useState,useEffect } from "react";
// import InfoDetail from '../InfoDetailPage/InfoDetailPage'



// export default function InfoDetial() {
//   const router = useRouter();
//   const { id } = router.query;
//   console.log(router.pathname)
//   // console.log(router.query);

//   const [Detial, setDetial] = useState([]);
//   const fetchID = async () => {
//     const url = `http://localhost:4000/api/v1/informations/${id}`;
//     try {
//       const response = await fetch(url); 
//       console.log(url);
//       const data = await response.json();
//       setDetial(data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   console.log(Detail)
//   useEffect(() => {
//     fetchID();
//   }, []);
 

   

  
// }
