import React from "react";

// importing components
import Topbar from "./../Topbar/Topbar";
import Navbar from "./../Navbar/Navbar";
import Landing from './../Landing/Landing'
export default function Header() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Landing />
    </>
  );
}
