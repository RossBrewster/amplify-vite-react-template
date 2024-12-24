import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import BorderBox from '../components/BorderBox';
import CubeSculpture from '../components/CubeSculpture';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);

  const handleAuthClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full bg-gray-900 text-white">
        {/* Navigation */}
        <nav className="w-full bg-gray-900 p-4 relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
            {/* Logo */}
            <div className="flex-1 flex gap-0.5">
              {['bg-pink-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400'].map((color, index) => (
                <div key={index} className={`w-6 h-6 ${color}`} />
              ))}
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 hidden md:flex items-center justify-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 border-b-2 border-white pb-1">Home</a>
              <a href="#" className="text-white hover:text-gray-300">About Us</a>
              <a href="#" className="text-white hover:text-gray-300">Our Method</a>
              <a href="#" className="text-white hover:text-gray-300">Contact Us</a>
            </div>
            
            {/* Sign Up Button */}
            <div className="flex-1 hidden md:flex justify-end">
              <div className="scale-75 origin-right">
                <BorderBox 
                  buttonText={user ? "Dashboard" : "Sign In"} 
                  onClick={handleAuthClick}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-32">
          {/* Text Content */}
          <div className="text-center relative z-40 mb-0 sm:mb-4 md:mb-8 lg:mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The future of learning is here
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Writer-Block
            </h2>
            <div className="text-xl text-gray-300 space-y-2">
              <p>AI-driven, Human Centered.</p>
              <p>Elevate your classroom to new heights.</p>
            </div>
          </div>

          {/* Wrapper for BorderBox and CubeSculpture */}
          <div className="relative">
            {/* Center Sign Up Button with pointer-events-none wrapper */}
            <div className="absolute inset-0 flex justify-center items-center z-40 pointer-events-none">
              <div className="pointer-events-auto transform sm:-translate-y-12 md:-translate-y-16 lg:-translate-y-20">
                <BorderBox 
                  buttonText={user ? "Dashboard" : "Sign Up"} 
                  onClick={handleAuthClick}
                />
              </div>
            </div>

            {/* Cube Sculpture */}
            <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9] z-30">
              <CubeSculpture />
            </div>
          </div>

          {/* Feature Cards section remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 relative z-40">
            {[1, 2, 3].map((index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm
                          transform transition-transform duration-300 hover:scale-105"
              >
                <div className="h-64 rounded-lg bg-white bg-opacity-5"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
