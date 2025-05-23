"use client";

import Header from "../../components/Header";

import LayoutSelector from "../../components/LayoutSelector";


import Footer from "../../components/Footer";
import { useState } from "react";
import HomeComponent from "../../components/Home/HomeComponent";

export default function Home() {

  return (
    <div className="bg-[#14213d] h-screen">
      <Header />
      <HomeComponent />
      <div className="p-6 bg-[#14213d] text-white">
        
      </div>
      <Footer />
    </div>
  );
}
