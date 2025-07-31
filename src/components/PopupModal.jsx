import React, { useRef, useEffect, useState } from 'react';
import favicon from '../assets/favicon.png';

const PopupModal = ({ show, onClose }) => {
  const modalRef = useRef();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

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
        setEmail('');

        // Close the popup after short delay so user sees success briefly
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 1000); // adjust delay if you want
      } else {
        if (
          data?.error?.includes('already a list member') ||
          data?.error?.includes('is already a list member')
        ) {
          setMessage(`${email} is already a member.`);
        } else {
          setMessage(data.error || 'Subscription failed.');
        }
        setEmail('');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Try again.');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  onClick={handleBackdropClick}
  className="fixed inset-0 bg-transparent flex items-center justify-center z-50 px-4 py-8 sm:px-6 sm:py-12"
>
  <div
    ref={modalRef}
    className="w-full max-w-md bg-white rounded-xl p-5 text-center shadow-xl text-black relative"
  >
    {/* Close button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
    >
      &times;
    </button>

    {/* Logo */}
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
      <div className="flex items-center justify-center">
        <img src={favicon} alt="favicon" className="h-14 sm:h-18" />
      </div>
    </div>

    {/* Content */}
    <div className="mt-10 space-y-4">
      <p className="text-sm sm:text-base leading-snug font-extralight">
        Join the <span className="font-bold">KULTURE NATION</span> fam today and unlock <br />
        <span className="font-bold">EXCLUSIVE CONTENT</span> on history, heritage, and more!
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Subscribe'}
        </button>
        {message && (
          <p className={`text-sm ${message.includes('success') ? 'text-yellow-400' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>

      <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">
        By providing my email I agree to allow Kulture Nation to use my email for marketing purposes, and I agree to the terms and conditions.
      </p>
    </div>
  </div>
</div>

  );
};

export default PopupModal;
