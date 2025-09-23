import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface AppFinaleScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function AppFinaleScreen({
  onBack,
  onNext
}: AppFinaleScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:app_finale:landing"}');
  }, []);

  const handleComplete = () => {
    onNext();
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-6 px-4">
        <button className="p-2 text-gray-800" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Scenic illustration section */}
      <div className="relative h-48 mb-6 mx-4">
        <div 
          className="w-full h-full rounded-3xl bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: 'url(/images/22-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Duck and characters overlay - using absolute positioning to simulate the scene */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <img 
              src="/images/22-duck.png" 
              alt="Quabble Duck" 
              className="w-16 h-16 object-contain" 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6">
        {/* Statistics text */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-gray-800 leading-relaxed">
            87% of regular users report they improved their mental health since they started using Quabble
          </h1>
        </div>

        {/* Testimonial section */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-2xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium">😊</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800 mb-1">Nat</div>
              <div className="text-sm text-gray-700 border-2 border-dashed border-blue-400 rounded p-2">
                "I really love Quabble, my therapist suggested it and it keeps me afloat during the week."
              </div>
            </div>
          </div>
        </div>

        {/* Therapist-recommended section */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Therapist-recommended
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Quabble brings real wellness practices to daily life—backed by experts like our advisor, Dr. Jung Kim, Assist. Professor of Psychiatry at Harvard Medical School
          </p>
        </div>

        {/* Feature cards */}
        <div className="flex gap-4 mb-8">
          {/* Mood Diary card */}
          <div className="flex-1 bg-pink-100 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Mood Diary</h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Simple, effective mood tracking to recognize patterns and triggers
            </p>
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg">☁️</span>
              </div>
            </div>
          </div>

          {/* Pleasant Activities card */}
          <div className="flex-1 bg-teal-100 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Pleasant Activities</h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Plan and engage in activities that bring you joy
            </p>
            <div className="flex justify-center">
              <div className="w-12 h-12 flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-6 pb-12">
        <div className="max-w-sm mx-auto">
          <button 
            className="w-full py-4 px-6 rounded-full text-white text-center bg-black hover:bg-gray-800 transition-colors"
            onClick={handleComplete}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}