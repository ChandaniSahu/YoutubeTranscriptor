import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const sections = {
  aboutus: 'This YouTube Transcriptor helps you automatically transcribe any YouTube video into readable text instantly.',
  features: 'Features include: AI-powered transcription, subtitle download, multi-language support, and accurate timestamps.',
  contactus: 'Contact us at youtubetranscriptor@yopmail.com or follow us on social media.',
};

const Home =()=> {
const navigate = useNavigate();
  return (<>
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-[url('./ytbg.jpg')] " >
      <nav className="flex items-center justify-between p-6 bg-black bg-opacity-60 text-white">
        <div className="text-2xl font-bold">YouTube Transcriptor</div>
        
   <button   onClick={() => navigate('/transcript')}  className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300">Get Transcript</button>
      
      </nav>

      {/* Main Intro Content */}
      <div className="flex-1 flex items-center px-10">
        <div className="text-white text-left w-[300px]">
          <h1 className="text-5xl font-extrabold mb-4">Welcome in YouTube Transcriptor</h1>
          <p className="text-lg mb-6">
            Our web app automatically transcribes YouTube videos to text. Just paste a link, and we do the rest — fast, simple, and accurate!
          </p>
          <button  onClick={() => navigate('/transcript')} className="bg-yellow-400 text-black px-6 py-2 rounded text-lg hover:bg-yellow-300">Get Started</button>
        </div>
      </div>
</div>
{/* Section Blocks OUTSIDE background */}
<div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-16 px-4 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
        <div className="p-6 shadow-lg rounded-2xl bg-white border border-yellow-200 hover:shadow-yellow-300 transition-shadow">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-700">About Us</h2>
          <p className="text-sm leading-relaxed">{sections.aboutus}</p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl bg-white border border-yellow-200 hover:shadow-yellow-300 transition-shadow">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-700">Features</h2>
          <p className="text-sm leading-relaxed">{sections.features}</p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl bg-white border border-yellow-200 hover:shadow-yellow-300 transition-shadow">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-700">Contact Us</h2>
          <p className="text-sm leading-relaxed">{sections.contactus}</p>
        </div>
      </div>
      <footer className="bg-black bg-opacity-60 text-white py-4 text-center">
        <p>&copy; 2025 YouTube Transcriptor. All rights reserved.</p>
    </footer>
 </> );
}

export default Home;