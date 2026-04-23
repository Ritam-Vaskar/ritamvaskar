"use client";
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen w-full py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get in <span className="text-slate-300">Touch</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Feel free to reach out for collaborations, questions, or just a chat!</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 max-w-6xl w-full mx-auto items-center">
        <div className="relative flex flex-col items-center gap-6 p-6 border border-slate-700 w-full h-[435px] md:w-1/2 bg-slate-900">
          <img src="/assets/ritam.jpeg" alt="Your Name" className="w-32 h-32 object-cover border-2 border-slate-500" />
          <h3 className="text-2xl font-bold text-white">Ritam Vaskar</h3>
          <p className="text-gray-400 text-sm text-center">Web Developer | Tech Enthusiast | Creator</p>
          <div className="flex flex-col gap-2 text-gray-300">
            <p>📧 Email: <span className="text-slate-300">ritamvaskar0@gmail.com</span></p>
            <p>📱 Phone: <span className="text-slate-300">+91 9609887167</span></p>
            <p>🌍 Location: <span className="text-slate-300">Raghunathganj,WB</span></p>
          </div>
        </div>

        <form className="w-full md:w-1/2 p-8 flex flex-col gap-6 border border-slate-700 bg-slate-900">
          <h3 className="text-2xl font-bold text-white">Send a Message</h3>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-slate-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-slate-500 border border-slate-700" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-slate-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-slate-500 border border-slate-700" />
            <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-3 bg-slate-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-slate-500 border border-slate-700"></textarea>
          </div>
          <button
            type="button"
            onClick={() => {
              const name = document.querySelector('input[placeholder="Your Name"]').value;
              const email = document.querySelector('input[placeholder="Your Email"]').value;
              const message = document.querySelector('textarea[placeholder="Your Message"]').value;
              const whatsappMessage = `Hello, my name is ${name}. My email is ${email}. Here is my message: ${message}`;
              const encodedMessage = encodeURIComponent(whatsappMessage);
              const phoneNumber = "919609887167";
              window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
            }}
            className="px-6 py-3 bg-slate-700 text-white font-medium border border-slate-600 hover:bg-slate-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
