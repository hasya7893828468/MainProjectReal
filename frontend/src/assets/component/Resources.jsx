import {ArrowRight, BookOpen, FileText, Calendar} from 'lucide-react';

const Resources = () => {
  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Legal Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest legal insights and publications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'Legal Guides',
                description: 'Comprehensive guides on various legal topics',
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Webinars',
                description: 'Regular online sessions with legal experts',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Case Studies',
                description: 'Real-world examples of our successful cases',
              },
            ].map ((resource, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-blue-600 mb-6">{resource.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <button className="text-blue-600 font-semibold flex items-center group">
                  Access Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
