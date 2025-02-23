import {Check, Star} from 'lucide-react';
// import '../App.css';

const MainHome = () => {
  return (
    <div className="mainHome">
      <section className="py-20 bg-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Nova Law?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Innovative Approach',
                    description: 'Combining traditional legal expertise with modern solutions',
                  },
                  {
                    title: 'Global Reach',
                    description: 'International network of legal professionals and resources',
                  },
                  {
                    title: 'Client-Centric Focus',
                    description: 'Tailored strategies aligned with your objectives',
                  },
                  {
                    title: 'Technology Integration',
                    description: 'Leveraging advanced legal tech for optimal results',
                  },
                ].map ((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-100">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Modern office"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-xl">4.9/5.0</p>
                    <p className="text-gray-600">Client Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHome;
