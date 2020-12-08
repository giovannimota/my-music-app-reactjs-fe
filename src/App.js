import React from "react";
import "./Root.css";
import HomeMusic from "./main/HomeMusic";

const App = (props) => {
  const name="Giovanni Mota";
  const email="giovanni.mota01@gmail.com";
  const year="2020";
  return (
    <>
      <HomeMusic nome={name} meuEmail={email} ano={year}/>
    </>
  );
}

export default App;