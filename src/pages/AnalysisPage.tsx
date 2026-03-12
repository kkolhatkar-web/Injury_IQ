import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, AlertTriangle, Info, ToggleLeft, ToggleRight, Activity, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { generatePrescription } from '../services/injuryService';
import { MOCK_ATHLETES } from '../constants';

type BodyPart = 'hamstring' | 'quad' | 'ankle' | 'shoulder' | 'back' | 'none';

export function AnalysisPage() {
  const [view, setView] = React.useState<'FRONT' | 'BACK'>('FRONT');
  const [selectedPart, setSelectedPart] = React.useState<BodyPart>('none');
  const [cycleAware, setCycleAware] = React.useState(false);
  const [aiPrescription, setAiPrescription] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const athlete = MOCK_ATHLETES[0];

  const handlePartClick = async (part: BodyPart) => {
    setSelectedPart(part);
    if (part !== 'none') {
      setLoading(true);
      const prescription = await generatePrescription(athlete, part);
      setAiPrescription(prescription);
      setLoading(false);
    } else {
      setAiPrescription(null);
    }
  };

  const prescriptions = {
    hamstring: {
      risk: 'HIGH',
      overload: 85
    },
    quad: {
      risk: 'MODERATE',
      overload: 62
    },
    none: null
  };

  const currentData = selectedPart !== 'none' ? prescriptions[selectedPart as keyof typeof prescriptions] : null;

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white transition-colors">Digital Twin Body Map</h1>
          <p className="text-slate-500 dark:text-slate-400 transition-colors">Real-time biomechanical risk visualization</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-[#0F172A] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-2">Cycle-Aware Mode</span>
          <button 
            onClick={() => setCycleAware(!cycleAware)}
            className="transition-transform active:scale-90"
          >
            {cycleAware ? (
              <ToggleRight className="w-10 h-10 text-accent" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-300 dark:text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {cycleAware && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-primary dark:bg-slate-900 text-white p-6 rounded-3xl space-y-4 overflow-hidden border border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-accent text-primary text-xs font-black rounded-full uppercase">Luteal Phase</div>
              <span className="font-bold">Cycle-aware training = smarter, not softer</span>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Luteal phase increases ACL injury risk 2-8x — <span className="text-accent font-bold">reduce lateral cutting today.</span>
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Body Map Panel */}
        <div className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center space-y-8 min-h-[600px] transition-colors duration-300">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit transition-colors">
            {(['FRONT', 'BACK'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                  view === v 
                    ? "bg-white dark:bg-slate-800 text-primary dark:text-white shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white"
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="relative flex-1 flex items-center justify-center w-full">
            {/* Simple SVG Silhouette with interactive parts */}
            <svg viewBox="0 0 200 500" className="h-[500px] w-auto">
              {/* Head */}
              <circle cx="100" cy="40" r="25" fill="currentColor" className="text-slate-100 dark:text-slate-800 transition-colors" />
              {/* Torso */}
              <rect x="70" y="70" width="60" height="120" rx="10" fill="currentColor" className="text-slate-100 dark:text-slate-800 transition-colors" />
              {/* Arms */}
              <rect x="40" y="75" width="25" height="100" rx="10" fill="currentColor" className="text-slate-100 dark:text-slate-800 transition-colors" />
              <rect x="135" y="75" width="25" height="100" rx="10" fill="currentColor" className="text-slate-100 dark:text-slate-800 transition-colors" />
              
              {/* Legs - Interactive Parts */}
              <motion.path
                d="M70 195 L60 340 L85 340 L95 195 Z"
                fill={selectedPart === 'hamstring' ? '#FF3B30' : '#34C759'}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handlePartClick('hamstring')}
                whileTap={{ scale: 0.98 }}
              />
              <motion.path
                d="M105 195 L115 340 L140 340 L130 195 Z"
                fill="#34C759"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handlePartClick('quad')}
              />
              
              {/* Lower Legs */}
              <rect x="60" y="350" width="25" height="120" rx="10" fill="#34C759" />
              <rect x="115" y="350" width="25" height="120" rx="10" fill="#34C759" />
            </svg>

            {/* Labels */}
            <div className="absolute top-0 left-0 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-green" />
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 transition-colors">Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-yellow" />
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 transition-colors">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-red" />
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 transition-colors">High Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedPart !== 'none' ? (
              <motion.div
                key={selectedPart}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      currentData?.risk === 'HIGH' ? "bg-status-red/10" : "bg-status-yellow/10"
                    )}>
                      <AlertTriangle className={cn(
                        "w-6 h-6",
                        currentData?.risk === 'HIGH' ? "text-status-red" : "text-status-yellow"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-black text-primary dark:text-white text-xl uppercase tracking-tight transition-colors">Coaching Prescription</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Marcus Thompson • {selectedPart.toUpperCase()}</p>
                    </div>
                  </div>
                  <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-accent hover:text-primary transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4 min-h-[160px] flex flex-col justify-center transition-colors">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-8 h-8 text-accent animate-spin" />
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">AI Engine Analyzing...</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Risk Level</span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-black",
                          currentData?.risk === 'HIGH' ? "bg-status-red text-white" : "bg-status-yellow text-white"
                        )}>
                          {currentData?.risk} RISK
                        </span>
                      </div>
                      <p className="text-primary dark:text-white font-bold text-lg leading-snug transition-colors">
                        {aiPrescription}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 bg-accent/10 rounded text-[8px] font-black text-accent uppercase">AI Generated</div>
                        <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase transition-colors">Verified by InjuryIQ</div>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary dark:text-white transition-colors">Overload Intensity</span>
                    <span className="text-sm font-black text-status-red">{currentData?.overload || 0}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${currentData?.overload || 0}%` }}
                      className="h-full bg-status-red"
                    />
                  </div>
                </div>

                <button className="w-full py-4 bg-accent text-primary font-black rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all">
                  SHARE WITH COACH
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-100/50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 flex flex-col items-center text-center space-y-4 transition-colors"
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm transition-colors">
                  <Activity className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-400 dark:text-slate-500">No Body Part Selected</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-sm max-w-[240px]">Tap any color-coded muscle group on the body map to view specific coaching prescriptions.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
