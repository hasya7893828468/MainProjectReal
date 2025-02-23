import Home from '../HeroSection/Home.jsx';

import NavBar from '../NavBar/NavBar.jsx';
import Entry from '../Entry';
import MainHome from '../MainHome';
import Welcome from '../Welcome';
import Resources from '../Resources';
import Contact from '../Contact';
import Footer from '../Footer';

function Main () {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <Home />

      {/* Practice Areas Section */}
      <Entry />

      {/* Why Choose Us Section */}
      <MainHome />

      {/* Testimonials Section */}
      <Welcome />

      {/* Resources Section */}
      <Resources />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Main;
