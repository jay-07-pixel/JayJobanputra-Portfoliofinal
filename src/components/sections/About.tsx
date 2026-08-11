import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../layout/TextReveal';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import ParallaxEffect from '../layout/ParallaxEffect';
import FloatingAnimation from '../layout/FloatingAnimation';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <FloatingAnimation 
        x={30} 
        y={20} 
        rotate={10} 
        duration={15} 
        className="absolute top-10 right-10 opacity-20 hidden lg:block"
      >
        <div className="w-40 h-40 border-2 border-primary rounded-full"></div>
      </FloatingAnimation>
      
      <FloatingAnimation 
        x={20} 
        y={40} 
        rotate={5} 
        duration={18} 
        delay={2} 
        className="absolute bottom-10 left-10 opacity-20 hidden lg:block"
      >
        <div className="w-60 h-60 border-2 border-secondary rounded-full"></div>
      </FloatingAnimation>
      
      <div className="container-section relative z-10">
        <ScrollAnimationWrapper animation="bounce">
          <h2 className="section-title">About Me</h2>
        </ScrollAnimationWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          {/* Image column */}
          <ParallaxEffect direction="left" offset={30}>
            <ScrollAnimationWrapper 
              animation="slideIn" 
              direction="left" 
              threshold={0.3}
              className="flex justify-center"
            >
              <div className="w-48 h-60 xs:w-56 xs:h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 rounded-lg bg-gray-800 overflow-hidden mx-auto border border-white/10">
                <img 
                  src="/profile-photo.jpg" 
                  alt="Jay Jobanputra" 
                  className="w-full h-full object-cover object-[center_20%]" 
                  loading="lazy"
                />
              </div>
            </ScrollAnimationWrapper>
          </ParallaxEffect>
          
          {/* Content column */}
          <ParallaxEffect direction="right" offset={30}>
            <ScrollAnimationWrapper 
              animation="slideIn" 
              direction="right" 
              delay={0.2}
              threshold={0.3}
            >
              <TextReveal 
                text="Hi, I'm Jay." 
                tag="h3" 
                className="text-2xl md:text-3xl font-bold mb-2 text-light-text" 
                staggerChildren={0.05}
              />

              <motion.p
                className="text-lg md:text-xl font-semibold text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false, threshold: 0.3 }}
              >
                Think it. Build it. Make it real.
              </motion.p>
              
              <motion.div
                className="space-y-4 text-light-text/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false, threshold: 0.3 }}
              >
                <p>
                  I'm a <span className="font-semibold text-light-text">B.Tech AI &amp; Data Science student</span>,{' '}
                  <span className="font-semibold text-light-text">developer</span>, and{' '}
                  <span className="font-semibold text-light-text">entrepreneur</span> who enjoys building
                  technology that solves real-world problems. Through{' '}
                  <span className="font-semibold text-light-text">freelancing and my own work</span>, I've built
                  web applications, Android apps, AI-powered systems, and solutions for businesses.
                </p>
                
                <p>
                  I enjoy taking an idea from{' '}
                  <span className="font-semibold text-light-text">"what if?"</span> to{' '}
                  <span className="font-semibold text-light-text">something people can actually use</span>.
                  Whether I'm <span className="font-semibold text-light-text">building a product</span>,{' '}
                  exploring an <span className="font-semibold text-light-text">AI solution</span>, or{' '}
                  experimenting with a new idea, I{' '}
                  <span className="font-semibold text-light-text">learn by building</span> and figuring things out
                  along the way.
                </p>

                <p>
                  I'm also passionate about{' '}
                  <span className="font-semibold text-light-text">startups, innovation and leadership</span>, and
                  enjoy working with people who are curious, ambitious, and willing to build something
                  meaningful.
                </p>

                <p className="pt-2 font-semibold text-primary">
                  Every idea starts with a problem. Every solution starts with an idea.
                </p>
              </motion.div>
            </ScrollAnimationWrapper>
          </ParallaxEffect>
        </div>
      </div>
    </section>
  );
};

export default About; 