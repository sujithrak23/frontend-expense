import React, { useEffect, useState } from "react";
import "./Album.css"
import Image from './components/image'
import Title from "./components/title";
import { Link } from "react-router-dom";
import Logout from "./components/logout";


export function Album() {
  //   const data = [
  //     {
  //       id: 1,
  //       title: "Hi",
  //     },
  //     { id: 2, title: "Hello" },
  //   ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // setData([
    //   {
    //     id: 1,
    //     title: "Hi",
    //   },
    //   { id: 2, title: "Hello" },
    // ]);

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((albums) => setData(albums))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Link to="/expense" >Expense</Link>
      <Logout/>
      {data.map((item) => {
        return (
          <>
             <p>{item.title}</p> 
            <Title title={item.title} casing="upper"/>
           <Image path={item.url} size={70}/>
          </>
        );
      })}
    </div>
  );
}