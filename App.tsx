import React, { useState, useEffect } from 'react';
import { FLOW_STEPS, INITIAL_STEP_ID } from './constants';
import { CartoonButton } from './components/CartoonButton';
import { Mascot } from './components/Mascot';
import { CheatSheetModal } from './components/CheatSheetModal';
import { ArrowRight, RotateCcw, AlertCircle, CheckCircle, HelpCircle, FileText, Phone } from 'lucide-react';
// @ts-ignore
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState(INITIAL_STEP_ID);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const currentStep = FLOW_STEPS[currentStepId];

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepId]);

  // Confetti Effect on Success
  useEffect(() => {
    if (currentStep.imageType === 'success') {
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ['#FFD500', '#009CDA', '#B90000', '#009B48', '#FF5800'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [currentStepId, currentStep.imageType]);

  // Screen Retention (Wake Lock API)
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          // @ts-ignore
          wakeLock = await navigator.wakeLock.request('screen');
          console.log('Screen Wake Lock active');
        } catch (err) {
          console.error('Wake Lock request failed:', err);
        }
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock !== null) {
        wakeLock.release()
          .then(() => {
            wakeLock = null;
          });
      }
    };
  }, []);

  const handleRestart = () => {
    setCurrentStepId(INITIAL_STEP_ID);
  };

  const getEmotion = () => {
    if (currentStep.imageType === 'success') return 'excited';
    if (currentStep.imageType === 'question') return 'thinking';
    return 'happy';
  };

  const getBgColor = () => {
    switch (currentStep.imageType) {
        case 'success': return 'bg-cube-green/20';
        case 'action': return 'bg-cube-blue/10';
        case 'question': return 'bg-white';
        default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#FFFBEB] selection:bg-cube-yellow selection:text-black">
      
      {/* Cheat Sheet Modal */}
      <CheatSheetModal isOpen={isCheatSheetOpen} onClose={() => setIsCheatSheetOpen(false)} />

      {/* Header */}
      <header className="bg-ashkam-purple text-white p-4 border-b-4 border-black sticky top-0 z-50 shadow-cartoon">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cube-yellow border-2 border-black rounded hidden xs:block"></div>
            <h1 className="font-black text-lg md:text-2xl tracking-tight uppercase truncate">Ashkam Intelligent Studios</h1>
          </div>
          <div className="flex items-center gap-3">
             <button
              onClick={() => setIsCheatSheetOpen(true)}
              className="bg-white text-black p-2 rounded border-2 border-black shadow-cartoon-active hover:bg-gray-100 active:translate-y-1 active:shadow-none transition-all"
              title="Algorithm Cheat Sheet"
             >
                <FileText size={20} />
             </button>
            <button 
                onClick={handleRestart}
                className="bg-cube-red hover:bg-red-600 text-white font-bold py-1 px-3 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 text-sm"
            >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6 flex flex-col items-center">
        
        {/* Progress Dots (Abstract) */}
        <div className="w-full max-w-4xl mb-8 flex gap-2 justify-center">
             {Object.keys(FLOW_STEPS).map((key, index) => {
                 if (index % 3 !== 0 && key !== currentStepId) return null; 
                 return (
                     <div key={key} className={`w-3 h-3 rounded-full border-2 border-black ${key === currentStepId ? 'bg-cube-blue' : 'bg-gray-300'}`}></div>
                 )
             })}
        </div>

        <div className={`w-full max-w-2xl ${getBgColor()} border-4 border-black rounded-3xl p-6 md:p-10 shadow-cartoon-lg transition-colors duration-500 relative overflow-hidden`}>
          
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-cube-yellow border-l-4 border-b-4 border-black rounded-bl-3xl -mr-[2px] -mt-[2px] z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Mascot */}
            <div className="mb-4">
              <Mascot emotion={getEmotion()} />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight text-black drop-shadow-sm">
              {currentStep.title}
            </h2>

            {/* Step Image */}
            {currentStep.imageUrl && (
              <div className="mb-8 w-full max-w-md transform hover:rotate-1 transition-transform duration-300">
                <img 
                  src={currentStep.imageUrl} 
                  alt={currentStep.title} 
                  className="w-full h-auto rounded-xl border-4 border-black shadow-cartoon"
                />
              </div>
            )}

            {/* Algorithm Box */}
            {currentStep.algorithm && (
              <div className="bg-black text-cube-yellow font-mono text-2xl md:text-3xl py-4 px-8 rounded-xl border-4 border-gray-800 mb-6 shadow-[4px_4px_0px_0px_#888] transform -rotate-2 hover:rotate-0 transition-transform">
                {currentStep.algorithm}
              </div>
            )}

            {/* Description */}
            <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed max-w-lg">
              {currentStep.description}
            </p>

            {/* Tip Box */}
            {currentStep.tip && (
              <div className="bg-blue-100 border-l-8 border-cube-blue p-4 mb-8 text-left w-full rounded-r-lg flex gap-3 items-start shadow-sm">
                <HelpCircle className="text-cube-blue shrink-0 mt-1" />
                <p className="text-gray-700 italic">{currentStep.tip}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentStep.options.map((option, idx) => (
                <CartoonButton
                  key={idx}
                  onClick={() => setCurrentStepId(option.nextStepId)}
                  variant={option.variant || 'primary'}
                  className={currentStep.options.length === 1 ? "md:col-span-2" : ""}
                >
                  <div className="flex items-center justify-center gap-2">
                    {option.label}
                    {option.variant !== 'secondary' && <ArrowRight size={20} strokeWidth={3} />}
                  </div>
                </CartoonButton>
              ))}
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-6 text-center border-t-4 border-gray-800">
        <p className="font-bold uppercase tracking-wider text-cube-yellow mb-2">Ashkam Intelligent Studios</p>
        <p className="text-sm text-gray-400 mb-4">Based on the method by BrodytheCuber</p>
        
        <div className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border-2 border-gray-600">
            <Phone size={16} className="text-cube-green" />
            <a href="https://wa.me/918002416363" target="_blank" rel="noopener noreferrer" className="text-white font-mono hover:text-cube-green transition-colors">
                +91-8002416363
            </a>
        </div>
      </footer>
    </div>
  );
};

export default App;