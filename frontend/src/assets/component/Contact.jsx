import {Phone, Mail, MapPin, Clock, ArrowRight} from 'lucide-react';

const Contact = () => {
  return (
    <div>
      <section className="py-20 bg-gradient">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-black">
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-blue-500 mb-8">
                Schedule a consultation with our expert legal team
              </p>
              <div className="space-y-6">
                {[
                  {icon: <Phone />, text: '(555) 123-4567'},
                  {icon: <Mail />, text: 'contact@novalaw.com'},
                  {
                    icon: <MapPin />,
                    text: '123 Innovation Ave, New York, NY 10001',
                  },
                  {icon: <Clock />, text: 'Monday - Friday: 9:00 AM - 6:00 PM'},
                ].map ((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-300/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-900">{item.icon}</span>
                    </div>
                    <strong className="text-blue-500">{item.text}</strong>
                  </div>
                ))}
              </div>
            </div>

            <form className="bg-white p-8 rounded-xl shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Practice Area
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Practice Area</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="ip">Intellectual Property</option>
                    <option value="employment">Employment Law</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Message"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
