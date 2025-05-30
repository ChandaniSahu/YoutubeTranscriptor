import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBook, FiYoutube, FiFileText, FiAward, FiMail } from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://res.cloudinary.com/dn4trwbmw/image/upload/v1748592808/bcaar9dmjca6n4vkzca0.png" 
                alt="Logo" 
                className="h-10 w-10 rounded-full "
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tech Experts
              </span>
            </Link>
          </motion.div>
          <div className="flex space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="text-indigo-600 font-medium">
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/transcript" className="text-gray-600 hover:text-indigo-600">
                Try Now
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="md:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Learn Smarter with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform any content into bite-sized summaries and interactive quizzes powered by Gemini AI.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/transcript"
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="https://res.cloudinary.com/dn4trwbmw/image/upload/v1748592609/gijpqboxcyo0o7jl0nkc.png" 
            alt="AI Learning Assistant" 
            className="w-full h-auto rounded-xl shadow-2xl border-8 border-white/20"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white/30 backdrop-blur-sm rounded-3xl my-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-16"
        >
          Powerful Features
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FiBook className="text-3xl" />,
              title: "Smart Summaries",
              desc: "Extract key points from any text or video content",
              img: "https://res.cloudinary.com/dn4trwbmw/image/upload/v1748592984/uuheczwtpkelvkqvogyd.png"
            },
            {
              icon: <FiAward className="text-3xl" />,
              title: "AI Quizzes",
              desc: "Test your knowledge with auto-generated MCQs",
              img: "https://res.cloudinary.com/dn4trwbmw/image/upload/v1748593057/egck1h4aswenikdgcmct.png"
            },
            {
              icon: <FiMail className="text-3xl" />,
              title: "Email Reports",
              desc: "Get detailed results sent to your inbox",
              img: "https://res.cloudinary.com/dn4trwbmw/image/upload/v1748593178/zhisybxxfuv2ecwejicg.png"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.img} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          Transform your learning in just three simple steps
        </motion.p>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://res.cloudinary.com/dn4trwbmw/image/upload/v1748593304/hfpeixasqni9qpjbkfgu.png" 
              alt="How it works" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.div 
            className="md:w-1/2 space-y-8"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                icon: <FiFileText className="text-2xl" />,
                step: "Step 1",
                title: "Input Content",
                desc: "Paste your text, enter a topic, or add a YouTube URL"
              },
              {
                icon: <FiYoutube className="text-2xl" />,
                step: "Step 2",
                title: "Generate Summary",
                desc: "Our AI processes your input and creates a concise summary"
              },
              {
                icon: <FiAward className="text-2xl" />,
                step: "Step 3",
                title: "Take Quiz & Get Results",
                desc: "Test your knowledge and receive detailed analytics"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 5 }}
                className="flex gap-4 items-start p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-sm font-medium text-indigo-600">{item.step}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-assisted learning today
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/transcript"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-indigo-600 font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg"
            >
              Try Now For Free <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="https://res.cloudinary.com/dn4trwbmw/image/upload/v1748592808/bcaar9dmjca6n4vkzca0.png" 
                  alt="Logo" 
                  className="h-10 w-10"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Tech Experts
                </span>
              </Link>
              <p className="text-gray-400 mt-2">AI-powered learning assistant</p>
            </div>
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400 mt-2">Tech Experts:</p>
              <ul className="list-none list-inside">
                <li className="text-gray-400">Chandani</li>
                <li className="text-gray-400">Chanakya</li>
              </ul>
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Tech Experts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;