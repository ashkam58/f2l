import React from 'react';
import { FLOW_STEPS } from '../constants';
import { X, ClipboardList } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Extract steps that have an algorithm
  const algorithms = Object.values(FLOW_STEPS).filter(step => step.algorithm);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl border-4 border-black shadow-cartoon-lg flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="bg-cube-yellow p-4 border-b-4 border-black flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2 text-black">
                <ClipboardList size={28} strokeWidth={2.5} />
                <h2 className="text-2xl font-black uppercase tracking-tight">Algorithm Cheat Sheet</h2>
            </div>
            <button 
                onClick={onClose}
                className="bg-cube-red text-white p-2 rounded-lg border-2 border-black hover:bg-red-600 transition-colors shadow-cartoon active:shadow-none active:translate-y-1"
            >
                <X size={24} strokeWidth={3} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar bg-amber-50">
            <div className="space-y-4">
                {algorithms.map((step) => (
                    <div key={step.id} className="bg-white border-2 border-black p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 leading-tight">{step.title}</h3>
                            <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                        <div className="bg-black text-cube-yellow font-mono text-lg px-4 py-2 rounded-lg border-2 border-gray-700 whitespace-nowrap text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                            {step.algorithm}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center text-gray-500 text-sm italic">
                Tip: Memorize these patterns to speed up your F2L!
            </div>
        </div>
      </div>
    </div>
  );
};