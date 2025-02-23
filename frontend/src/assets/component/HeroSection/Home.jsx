import React, {useEffect, useRef, useState} from 'react';
import {ChevronRight, ArrowRight} from 'lucide-react';
// import '../../App.cs';
import {homeData} from './home';
const HomePage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState (false);

  const videoRef = useRef (HTMLVideoElement > null);

  useEffect (() => {
    if (videoRef.current) {
      videoRef.current.play ().catch (() => {
        console.log ('Video autoplay failed');
      });
    }
  }, []);

  return (
    <div className="navBar">
      <header className="relative h-screen flex items-center clip-path-slant">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded (true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source
              src="https://player.vimeo.com/external/451837014.sd.mp4?s=7a7e37b5b7723e3a3112c0084d7d36d0c58e5a18&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <div className="animate-slide-in">
              <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight text-shadow">
                Legal
                <span className="text-gradient block">Innovation</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Pioneering legal solutions for the digital age. We combine centuries
                of legal expertise with cutting-edge innovation to deliver
                exceptional results.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center">
                  Schedule Consultation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all flex items-center">
                  Our Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        {/* <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 shadow pt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {homeData.map ((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-xl card-hover animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </header>

    </div>
  );
};

export default HomePage;
