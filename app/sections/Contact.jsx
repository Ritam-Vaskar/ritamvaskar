"use client";
import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const floatingAnimation = {
    animate: {
      y: ["0px", "-15px", "0px"],
      x: ["0px", "15px", "-15px", "0px"],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const hoverAnimation = {
    whileHover: {
      scale: 1.02,
      boxShadow: "0px 10px 20px rgba(128, 90, 213, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-12 px-4 flex flex-col items-center overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-xl"
          variants={floatingAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-indigo-500/30 blur-md"
          variants={floatingAnimation}
          animate="animate"
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get in <span className="text-purple-500">Touch</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Feel free to reach out for collaborations, questions, or just a chat!
        </p>
        <motion.div
          className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row gap-12 max-w-6xl w-full mx-auto items-center">
        {/* Contact Info */}
        <motion.div
          className="relative flex flex-col items-center gap-6 p-6 border border-gray-700 rounded-2xl shadow-lg w-full h-[435px] md:w-1/2"
          variants={hoverAnimation}
          whileHover="whileHover"
        >
          <img
            src="/assets/ritam.jpeg"
            alt="Your Name"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
          />
          <h3 className="text-2xl font-bold text-white">Ritam Vaskar</h3>
          <p className="text-gray-400 text-sm text-center">
            Web Developer | Tech Enthusiast | Creator
          </p>
          <div className="flex flex-col gap-2 text-gray-300">
            <p>
              📧 Email:{" "}
              <span className="text-purple-500">ritamvaskar0@gmail.com</span>
            </p>
            <p>
              📱 Phone: <span className="text-purple-500">+91 9609887167</span>
            </p>
            <p>
              🌍 Location:{" "}
              <span className="text-purple-500">Raghunathganj,WB</span>
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2  p-8 rounded-2xl shadow-lg flex flex-col gap-6 border border-gray-700"
        >
          <h3 className="text-2xl font-bold text-white">Send a Message</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <motion.button
            type="button" // Prevent default form submission
            onClick={() => {
              const name = document.querySelector(
                'input[placeholder="Your Name"]'
              ).value;
              const email = document.querySelector(
                'input[placeholder="Your Email"]'
              ).value;
              const message = document.querySelector(
                'textarea[placeholder="Your Message"]'
              ).value;

              const whatsappMessage = `Hello, my name is ${name}. My email is ${email}. Here is my message: ${message}`;
              const encodedMessage = encodeURIComponent(whatsappMessage);
              const phoneNumber = "919609887167"; // Use country code

              window.open(
                `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
                "_blank"
              );
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 15px rgba(128, 90, 213, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 transition duration-200"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
