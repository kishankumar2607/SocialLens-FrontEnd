
import React from 'react';

const AuthSection = () => (
  <section className="py-16 bg-surface-medium text-white">
    <div className="max-w-xl mx-auto card-glassmorphic text-center">
      <h2 className="text-2xl font-bold mb-4">Create your account</h2>
      <p className="text-text-secondary mb-6">Sign up or log in to personalize your analytics dashboard</p>
      <form className="space-y-4">
        <input className="input-default w-full" type="email" placeholder="Email" />
        <input className="input-default w-full" type="password" placeholder="Password" />
        <div className="flex justify-between">
          <button className="btn-primary w-full">Login</button>
          <button className="btn-secondary w-full ml-4">Sign Up</button>
        </div>
      </form>
    </div>
  </section>
);

export default AuthSection;
