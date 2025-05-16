'use client';

import * as motion from "motion/react-client";
import { useState, useEffect } from 'react';

export function FadeText({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  )
}

interface TypingTextProps {
    text: string;
    speed?: number;
  }

export function TypingText({ text, speed = 100 }: TypingTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
  
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);
  
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="font-mono inline-block"
      >
        {displayText} 
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1,
            repeat: 3,
            repeatType: "loop",
            times: [0, 0.2, 0.8, 1]
          }}
          className="font-mono inline-block"
        >
          |
        </motion.span>
      </motion.span>
    );
  }