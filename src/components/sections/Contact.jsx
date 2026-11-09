import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiArrowUpRight,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiUser,
  FiMessageSquare,
  FiX,
} from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';
import Lightfall from '../ui/Lightfall';

export const Contact = () => {
  const { contact } = PORTFOLIO_DATA;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    setStatus('idle');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setErrorMessage('EmailJS configuration missing. Please check your environment variables.');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setErrorMessage(
        error?.text || 'Failed to dispatch message. Please try again or reach out directly.'
      );
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal direction="up" distance="32px" duration={800}>
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-950 p-8 sm:p-14 lg:p-20 shadow-2xl flex flex-col items-center text-center">
          {/* Lightfall WebGL background effect */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <Lightfall
              colors={['#ffffff']}
              backgroundColor="#3b82f6"
              speed={0.3}
              streakCount={2}
              streakWidth={0.8}
              twinkle={0.3}
              backgroundGlow={0.1}
              headGlow={0.6}
              bloom={0.35}
              mouseInteraction
              holdToWarp
              intro
            />
          </div>

          {/* Subtle radial overlay to enhance contrast and depth */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-radial from-transparent via-neutral-950/20 to-neutral-950/70" />

          {/* Foreground content - Minimalist Landing UI */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 backdrop-blur-md">
              Initiate Conversation
            </span>
            <h2 className="mt-4 font-cabinet text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-xl">
              Let’s build something extraordinary together.
            </h2>
            <p className="mt-4 text-base text-neutral-300 font-cabinet max-w-md">
              {contact.availability}
            </p>

            {/* Email and Profile actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleOpenModal}
                className="group inline-flex items-center gap-2 rounded-full bg-[#3B5BFF] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-white hover:text-neutral-950 hover:shadow-xl cursor-pointer"
              >
                <FiMail className="h-4 w-4" />
                <span>Send an Email</span>
                <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://github.com/chintan21-png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/70 backdrop-blur-md px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-neutral-200 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <span>GitHub Profile</span>
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Location info */}
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <FiMapPin className="h-3.5 w-3.5 text-blue-400" />
              <span>{contact.location}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Contact Form Modal - Clean Light Theme Matching Overall Portfolio */}
      {isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/50 backdrop-blur-sm transition-opacity animate-fadeIn"
            onClick={handleCloseModal}
            data-lenis-prevent
          >
            {/* Modal Dialog Card (White & Light Theme) */}
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              {/* Vibrant blue accent line on top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-[#3B5BFF] to-blue-400" />

              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-blue-500/20 bg-blue-50 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5BFF]">
                    Direct Dispatch
                  </span>
                  <h3 className="mt-2.5 font-cabinet text-2xl font-bold tracking-tight text-neutral-950">
                    Send a Message
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                    Fill out the form below to deliver an email directly to my inbox.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Success View */}
              {status === 'success' ? (
                <div className="mt-6 py-6 flex flex-col items-center text-center rounded-2xl bg-emerald-50/60 border border-emerald-200/80 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600">
                    <FiCheckCircle className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 font-cabinet text-xl font-bold text-neutral-950">
                    Message Delivered!
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600 max-w-xs">
                    Thank you for reaching out. Your message was sent directly to my personal email. I’ll get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-6 rounded-full bg-neutral-950 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#3B5BFF] cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Form Inputs */
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1.5"
                    >
                      <FiUser className="h-3.5 w-3.5 text-[#3B5BFF]" />
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      disabled={status === 'sending'}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/70 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-[#3B5BFF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/15 disabled:opacity-50"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1.5"
                    >
                      <FiMail className="h-3.5 w-3.5 text-[#3B5BFF]" />
                      <span>Your Email</span>
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      disabled={status === 'sending'}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/70 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-[#3B5BFF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/15 disabled:opacity-50"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="modal-message"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1.5"
                    >
                      <FiMessageSquare className="h-3.5 w-3.5 text-[#3B5BFF]" />
                      <span>Message</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, idea, or questions..."
                      disabled={status === 'sending'}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/70 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-[#3B5BFF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/15 disabled:opacity-50 resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                      <FiAlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      disabled={status === 'sending'}
                      className="rounded-xl px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B5BFF] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    >
                      {status === 'sending' ? (
                        <>
                          <FiLoader className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Email</span>
                          <FiSend className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Contact;
