import React, { useState, useEffect } from 'react';
import igIcon from '../assets/ig.png';
import ytIcon from '../assets/yt.png';
import tiktokIcon from '../assets/tiktok.png';

const SignUpSection = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

      try {
    const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${BACKEND_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });


      const data = await res.json();

      if (res.ok) {
        setMessage('Subscribed successfully!');
      } else {
        if (
          data?.error?.includes('already a list member') ||
          data?.error?.includes('is already a list member')
        ) {
          setMessage(`${email} is already a member.`);
        } else {
          setMessage(data.error || 'Subscription failed.');
        }
      }

      setEmail('');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Try again.');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <section className="w-full bg-black text-white py-16 px-4 flex flex-col items-center text-center">
      {/* Social Icons */}
      <div className="flex space-x-6 mb-8">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src={igIcon} alt="Instagram" className="w-8 h-8 sm:w-10 sm:h-10" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src={ytIcon} alt="YouTube" className="w-8 h-8 sm:w-10 sm:h-10" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src={tiktokIcon} alt="TikTok" className="w-8 h-8 sm:w-10 sm:h-10" />
        </a>
      </div>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 px-2 max-w-lg">
        Join the <span className="text-yellow-400">Kulture Nation</span> Today
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex items-center justify-between border border-yellow-400 rounded-full overflow-hidden bg-black px-3 py-1"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email@address.com"
          className="flex-1 px-4 py-3 bg-black text-white placeholder-gray-400 focus:outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition text-lg font-medium"
          disabled={loading}
        >
          {loading ? '...' : '➝'}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className={`mt-3 text-sm ${message.includes('success') ? 'text-yellow-400' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      {/* Terms */}
      <p className="text-xs text-gray-400 mt-6 max-w-md px-4">
        By providing my email I agree to allow Kulture Nation to use my email for marketing purposes, and I agree to the{' '}
        <a href="https://www.pray.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
          terms and conditions
        </a>.
      </p>
    </section>
  );
};

export default SignUpSection;
