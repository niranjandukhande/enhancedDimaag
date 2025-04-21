import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import {
  Brain,
  Youtube,
  Lock,
  Share2,
  Search,
  Globe,
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleAnimation />
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300">
              Your Second Brain for YouTube Content
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              enhancedDimaag
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Transform YouTube videos into organized knowledge with AI-powered
              summaries. Build your personal knowledge hub and share insights
              with others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={'/signup'}>
                {' '}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium flex items-center justify-center gap-2"
                  onClick={() => <Link to={'/signup'} />}
                >
                  Get Started <ArrowRight size={18} />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg border border-violet-700 bg-black/50 text-white font-medium"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronRight size={24} className="rotate-90 text-violet-400" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300">
              Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Personal Knowledge Hub
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              enhancedDimaag combines AI with your curation to create a powerful
              second brain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Youtube size={24} />}
              title="YouTube Summaries"
              description="Add YouTube links and get AI-generated summaries instantly. Save hours of watching with concise knowledge extraction."
            />
            <FeatureCard
              icon={<Brain size={24} />}
              title="Personal Knowledge Base"
              description="Organize all your content in one place. Your second brain remembers everything so you don't have to."
            />
            <FeatureCard
              icon={<Lock size={24} />}
              title="Privacy Controls"
              description="Choose what to keep private and what to share. You have complete control over your knowledge."
            />
            <FeatureCard
              icon={<Share2 size={24} />}
              title="Selective Sharing"
              description="Share specific content with friends or colleagues, even if the rest of your library is private."
            />
            <FeatureCard
              icon={<Search size={24} />}
              title="Explore Others' Knowledge"
              description="Discover public content from other users to expand your knowledge and perspectives."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Build Your Network"
              description="Connect with like-minded individuals and build a network of knowledge sharing."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300">
              How It Works
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Simple Yet Powerful
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              enhancedDimaag makes knowledge management effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard
              step={1}
              icon={<Youtube size={24} />}
              title="Add YouTube Links"
              description="Simply paste any YouTube URL and our AI will automatically generate a comprehensive summary of the content."
            />
            <HowItWorksCard
              step={2}
              icon={<Brain size={24} />}
              title="Organize Your Knowledge"
              description="Your content is automatically organized in your personal dashboard. Set privacy levels and categorize your knowledge."
            />
            <HowItWorksCard
              step={3}
              icon={<Share2 size={24} />}
              title="Share & Explore"
              description="Share specific content with friends or explore public content from other users to expand your knowledge."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-900/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300">
                See It In Action
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience the Power of enhancedDimaag
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Watch how easy it is to transform YouTube content into organized
                knowledge. Our AI-powered summaries save you time while
                retaining all the important information.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Paste any YouTube URL',
                  'Get instant AI-generated summaries',
                  'Organize content in your dashboard',
                  'Set privacy controls for each item',
                  'Share specific content with others',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-violet-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={'/signin'}>
                {' '}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium flex items-center justify-center gap-2"
                >
                  Try It Now <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="rounded-xl border border-gray-800 bg-black/50 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 border-b border-gray-800 p-3 bg-black">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-400">
                    enhancedDimaag
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-violet-500" />
                      <span className="text-xl font-bold">enhancedDimaag</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-white">
                        Home
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        Explore
                      </button>
                      <button className="px-4 py-1 rounded-lg bg-violet-600 text-white text-sm">
                        Add Content
                      </button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      Recent Content
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'How AI is Changing Software Development',
                          private: true,
                        },
                        {
                          title: 'The Future of Web Development in 2025',
                          private: false,
                        },
                        {
                          title: 'Understanding Quantum Computing Basics',
                          private: true,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-colors"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <div className="px-2 py-0.5 rounded bg-red-900/30 text-red-400 text-xs">
                                youtube
                              </div>
                              {item.private && (
                                <div className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs flex items-center gap-1">
                                  <Lock size={10} /> Private
                                </div>
                              )}
                            </div>
                            <button className="text-violet-400 hover:text-violet-300 text-sm">
                              View
                            </button>
                          </div>
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-sm text-gray-500">
                              Added 2 days ago
                            </div>
                            <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                              <Share2 size={14} /> Share
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of knowledge seekers who have transformed how they
              learn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="enhancedDimaag has completely changed how I consume YouTube content. The AI summaries are incredibly accurate and save me hours every week."
              author="Alex Johnson"
              role="Software Developer"
            />
            <TestimonialCard
              quote="As a student, this tool is invaluable. I can quickly extract key information from educational videos and organize everything in one place."
              author="Priya Sharma"
              role="Computer Science Student"
            />
            <TestimonialCard
              quote="The ability to share specific content while keeping the rest private is exactly what I needed. enhancedDimaag is now an essential part of my learning workflow."
              author="Michael Chen"
              role="Data Scientist"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300">
              Pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Building Your Second Brain
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-xl border border-gray-800 bg-black/50 p-6 transition-all hover:border-violet-700 hover:shadow-lg hover:shadow-violet-900/20">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-gray-400 mb-4">Perfect for getting started</p>
              <div className="text-3xl font-bold mb-6">
                $0
                <span className="text-lg font-normal text-gray-500">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <PricingFeature text="10 YouTube summaries per month" />
                <PricingFeature text="Basic organization tools" />
                <PricingFeature text="Public content only" />
                <PricingFeature text="Community access" />
              </ul>
              <button className="w-full py-2 rounded-lg border border-violet-700 text-violet-400 hover:bg-violet-900/20 transition-colors">
                Get Started
              </button>
            </div>

            <div className="rounded-xl border-2 border-violet-600 bg-black/50 p-6 shadow-lg shadow-violet-900/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-violet-600 rounded-full text-xs font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-4">
                For serious knowledge builders
              </p>
              <div className="text-3xl font-bold mb-6">
                $9.99
                <span className="text-lg font-normal text-gray-500">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <PricingFeature text="Unlimited YouTube summaries" />
                <PricingFeature text="Advanced organization tools" />
                <PricingFeature text="Private & public content" />
                <PricingFeature text="Selective sharing" />
                <PricingFeature text="Explore other users' content" />
              </ul>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black/50 p-6 transition-all hover:border-violet-700 hover:shadow-lg hover:shadow-violet-900/20">
              <h3 className="text-xl font-bold mb-2">Team</h3>
              <p className="text-gray-400 mb-4">For collaborative learning</p>
              <div className="text-3xl font-bold mb-6">
                $19.99
                <span className="text-lg font-normal text-gray-500">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <PricingFeature text="Everything in Pro" />
                <PricingFeature text="Team workspaces" />
                <PricingFeature text="Collaborative annotations" />
                <PricingFeature text="Advanced sharing controls" />
                <PricingFeature text="Admin dashboard" />
              </ul>
              <button className="w-full py-2 rounded-lg border border-violet-700 text-violet-400 hover:bg-violet-900/20 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-900 to-fuchsia-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to Enhance Your Knowledge?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-violet-100 mb-8"
            >
              Join thousands of users who are transforming how they learn from
              YouTube.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to={'/signup'}>
                {' '}
                <button className="px-8 py-3 rounded-lg bg-white text-violet-900 font-medium hover:bg-violet-100 transition-colors flex items-center justify-center gap-2">
                  Get Started for Free <ArrowRight size={18} />
                </button>
              </Link>
              <button className="px-8 py-3 rounded-lg border border-white text-white font-medium hover:bg-white/10 transition-colors">
                Schedule a Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-violet-500" />
                <span className="text-xl font-bold">enhancedDimaag</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your second brain for YouTube content.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-violet-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-violet-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} enhancedDimaag. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for the 3D particle animation
const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // 3D particles animation
    const particles: {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      vz: number;
    }[] = [];
    const numParticles = 200;
    const maxDepth = 1000;
    const colors = [
      'rgba(139, 92, 246, 0.8)', // violet-500
      'rgba(167, 139, 250, 0.8)', // violet-400
      'rgba(196, 181, 253, 0.6)', // violet-300
      'rgba(221, 214, 254, 0.4)', // violet-200
      'rgba(245, 208, 254, 0.6)', // fuchsia-200
      'rgba(240, 171, 252, 0.7)', // fuchsia-300
      'rgba(232, 121, 249, 0.8)', // fuchsia-400
    ];

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * maxDepth,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: -Math.random() * 2 - 1,
      });
    }

    // Animation loop
    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Sort particles by z-index for proper rendering
      particles.sort((a, b) => b.z - a.z);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position with rotation
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Reset particle if it goes out of bounds
        if (p.z < 1) {
          p.z = maxDepth;
          p.x = Math.random() * canvas.width - canvas.width / 2;
          p.y = Math.random() * canvas.height - canvas.height / 2;
        }

        // Apply rotation
        const rotX =
          p.x * Math.cos(angle * 0.001) - p.y * Math.sin(angle * 0.001);
        const rotY =
          p.x * Math.sin(angle * 0.001) + p.y * Math.cos(angle * 0.001);

        // Project 3D point to 2D space
        const scale = maxDepth / (maxDepth + p.z);
        const projectedX = rotX * scale + centerX;
        const projectedY = rotY * scale + centerY;
        const projectedSize = p.size * scale;

        // Draw particle
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = projectedX - (p2.x * scale + centerX);
          const dy = projectedY - (p2.y * scale + centerY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50 * scale) {
            ctx.beginPath();
            ctx.moveTo(projectedX, projectedY);
            ctx.lineTo(p2.x * scale + centerX, p2.y * scale + centerY);
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - distance / (50 * scale)) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      angle += 0.5;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-violet-800 hover:bg-gray-900"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-900/20 opacity-50 transition-all group-hover:scale-150"></div>
      <div className="relative space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-900/20">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

// How It Works Card Component
interface HowItWorksCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  step,
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-violet-800 hover:bg-gray-900"
    >
      <div className="absolute -right-6 -top-6 text-8xl font-bold text-violet-900/10 opacity-50 transition-all group-hover:text-violet-900/20">
        {step}
      </div>
      <div className="relative space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-900/20">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-violet-800 hover:bg-gray-900"
    >
      <div className="absolute -right-4 -top-4 text-6xl text-violet-900/30 opacity-50">
        "
      </div>
      <div className="relative space-y-4">
        <p className="text-gray-400">{quote}</p>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-violet-900/50"></div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-gray-500">{role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Pricing Feature Component
interface PricingFeatureProps {
  text: string;
}

const PricingFeature: React.FC<PricingFeatureProps> = ({ text }) => {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle size={16} className="text-violet-500" />
      <span className="text-gray-300">{text}</span>
    </li>
  );
};

export {
  ParticleAnimation,
  FeatureCard,
  HowItWorksCard,
  TestimonialCard,
  PricingFeature,
};

export default LandingPage;
