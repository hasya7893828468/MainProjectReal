import {Scale} from 'lucide-react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="w-8 h-8 text-blue-600" />
                <span className="text-white font-bold text-xl">NOVA LAW</span>
              </div>
              <p className="text-sm">
                Pioneering legal solutions for the modern world.
              </p>
            </div>

            {['Practice Areas', 'Company', 'Resources'].map ((title, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map (item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-blue-500 transition-colors"
                      >
                        {title} Link {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2024 Nova Law. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
