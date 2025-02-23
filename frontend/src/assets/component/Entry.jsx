import React, {useState} from 'react';
import {
  Shield,
  Users,
  ArrowRight,
  Building,
  BarChart,
  Globe,
  Target,
} from 'lucide-react';
const Entry = () => {
  const [activeTab, setActiveTab] = useState ('all');

  const practiceAreas = [
    {
      icon: <Building className="w-12 h-12" />,
      title: 'Corporate Law',
      description: 'Strategic counsel for businesses',
      category: 'business',
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'International Law',
      description: 'Global legal solutions',
      category: 'international',
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Intellectual Property',
      description: 'Protect your innovations',
      category: 'ip',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Employment Law',
      description: 'Workplace legal matters',
      category: 'employment',
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Mergers & Acquisitions',
      description: 'Strategic business combinations',
      category: 'business',
    },
    {
      icon: <BarChart className="w-12 h-12" />,
      title: 'Securities Law',
      description: 'Financial markets compliance',
      category: 'finance',
    },
  ];

  const filteredPracticeAreas = activeTab === 'all'
    ? practiceAreas
    : practiceAreas.filter (area => area.category === activeTab);

  return (
    <div>
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Practice Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized legal expertise across multiple disciplines
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                'all',
                'business',
                'international',
                'ip',
                'employment',
                'finance',
              ].map (tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab (tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {tab.charAt (0).toUpperCase () + tab.slice (1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredPracticeAreas.map ((area, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-xl shadow-lg card-hover"
              >
                <div className="mb-6 text-blue-600 transform group-hover:scale-110 transition-transform">
                  {area.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-6">{area.description}</p>
                <button className="text-blue-600 font-semibold flex items-center group">
                  Learn More
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

export default Entry;
