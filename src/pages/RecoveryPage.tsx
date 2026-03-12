import React from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Target, Shield, CheckCircle2, Filter, Flame, Award } from 'lucide-react';
import { RECOVERY_SESSIONS } from '../constants';
import { cn } from '../lib/utils';

export function RecoveryPage() {
  const [activeFilter, setActiveFilter] = React.useState<'ALL' | 'RED' | 'YELLOW' | 'GREEN'>('ALL');

  const filteredSessions = RECOVERY_SESSIONS.filter(s => 
    activeFilter === 'ALL' ? true : s.type === activeFilter
  );

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white transition-colors">Recovery Lab</h1>
          <p className="text-slate-500 dark:text-slate-400 transition-colors">Clinically validated injury prevention protocols</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-[#0F172A] px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <Flame className="w-5 h-5 text-status-red" />
          <span className="font-black text-primary dark:text-white uppercase tracking-tight transition-colors">7-Day Prevention Streak</span>
          <span className="text-2xl font-black text-primary dark:text-accent transition-colors">🔥 7</span>
        </div>
      </header>

      {/* Hero: Prescribed Recovery */}
      <section className="relative overflow-hidden bg-primary dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-white border border-white/5 transition-colors duration-300">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs font-black uppercase tracking-widest">Today's Prescribed Recovery</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
              Neuromuscular Training Session
            </h2>
            <div className="flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-bold">7 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span className="font-bold">Lower Body</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-bold">ACL Risk ↓62%</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-accent text-primary font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all">
                <Play className="w-5 h-5 fill-current" />
                START SESSION
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                ASSIGN TO TEAM
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white/40 uppercase tracking-widest">Session Progress</span>
                <span className="text-accent font-black">65%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[65%]" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className={cn(
                    "h-20 rounded-xl border flex items-center justify-center",
                    i === 1 ? "bg-accent/20 border-accent" : "bg-white/5 border-white/10"
                  )}>
                    {i === 1 ? <CheckCircle2 className="w-6 h-6 text-accent" /> : <div className="w-6 h-6 rounded-full border-2 border-white/20" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NMT Session Library */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-2xl font-black text-primary dark:text-white uppercase tracking-tight transition-colors">Prevention Library</h3>
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl transition-colors">
            {(['ALL', 'RED', 'YELLOW', 'GREEN'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all",
                  activeFilter === f 
                    ? "bg-white dark:bg-slate-800 text-primary dark:text-white shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredSessions.map((session) => (
            <motion.div 
              key={session.id}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-[#0F172A] rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300"
            >
              <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden transition-colors">
                <img 
                  src={session.imageUrl} 
                  alt={session.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold">{session.duration} min</span>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest",
                    session.type === 'RED' ? "bg-status-red text-white" : 
                    session.type === 'YELLOW' ? "bg-status-yellow text-white" : "bg-status-green text-white"
                  )}>
                    {session.type}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="space-y-1">
                  <h4 className="font-black text-primary dark:text-white leading-tight group-hover:text-accent transition-colors">{session.name}</h4>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">{session.targetArea}</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 leading-tight transition-colors">
                    Reduces {session.injuryReduced}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase transition-colors">Clinically Validated</div>
                  <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase transition-colors">Peer-Reviewed</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
