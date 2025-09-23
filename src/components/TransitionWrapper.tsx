import React, { useEffect, useState } from 'react';
interface TransitionWrapperProps {
  children: React.ReactNode;
  show: boolean;
}
export function TransitionWrapper({
  children,
  show
}: TransitionWrapperProps) {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(show);
  useEffect(() => {
    if (show) {
      setShouldRender(true);
      // Small delay to ensure DOM update before animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);
  return shouldRender ? <div className={`transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div> : null;
}