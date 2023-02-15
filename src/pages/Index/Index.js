import React from 'react'
import './Index.css'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// importing components
import Header from './../../components/Header/Header' ;
import LastCourses from './../../components/LastCourses/LastCourses' ; 
import AboutUs from './../../components/AboutUs/AboutUs'
import PopularCourses from '../../components/PopularCourses/PopularCourses';
import PresaleCourses from './../../components/PresaleCourses/PresaleCourses'
import LastArticles from './../../components/LastArticles/LastArticles'
import Footer from './../../components/Footer/Footer'

export default function Index() {
  return (
    <>
      <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses />
      <PresaleCourses />
      <LastArticles />
      <Footer />
    </>
  )
}
