
import React from 'react';
import { FaChartLine, FaUsers, FaCogs } from 'react-icons/fa';

const Features = () => (
  <section className="py-20 px-4 bg-surface-medium">
        <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-surface-dark p-6 rounded-lg text-center">
            <FaChartLine className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
            <p className="text-text-secondary">Monitor your social media metrics as they happen.</p>
          </div>
          <div className="bg-surface-dark p-6 rounded-lg text-center">
            <FaUsers className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Audience Insights</h3>
            <p className="text-text-secondary">Understand your audience demographics and preferences.</p>
          </div>
          <div className="bg-surface-dark p-6 rounded-lg text-center">
            <FaCogs className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Automated Reports</h3>
            <p className="text-text-secondary">Receive regular reports to track your performance.</p>
          </div>
        </div>
      </section>
);

export default Features;
