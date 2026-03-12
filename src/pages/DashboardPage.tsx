import React from 'react';
import { motion } from 'motion/react';
import { Activity, Heart, RefreshCw, Zap, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { MOCK_ATHLETES } from '../constants';
import { cn } from '../lib/utils';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export function DashboardPage() {
  const athlete = MOCK_ATHLETES[0]; // Marcus

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <header>
        <h1 className="text-3xl font-bold text-primary dark:text-white transition-colors">Good morning, Marcus.</h1>
        <p className="text-slate-500 dark:text-slate-400 transition-colors">Here's your readiness report for tonight's training.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Daily Safety Score */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center space-y-6 transition-colors duration-300"
        >
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800 transition-colors"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke={athlete.status === 'SAFE' ? '#34C759' : athlete.status === 'CAUTION' ? '#FF9500' : '#FF3B30'}
                strokeWidth="12"
                strokeDasharray={552.92}
                strokeDashoffset={552.92 * (1 - 0.65)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn(
                "text-2xl font-black tracking-tight",
                athlete.status === 'SAFE' && "text-status-green",
                athlete.status === 'CAUTION' && "text-status-yellow",
                athlete.status === 'OVERLOAD_RISK' && "text-status-red"
              )}>
                {athlete.status === 'SAFE' ? 'SAFE' : athlete.status === 'CAUTION' ? 'CAUTION' : 'OVERLOAD RISK'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-600 dark:text-slate-300 font-medium transition-colors">
              {athlete.status === 'CAUTION' 
                ? "CAUTION: Your body needs rest before tonight's session" 
                : "You're in the GREEN today — great recovery!"}
            </p>
          </div>
        </motion.div>

        {/* Card 2: HRV (Recovery Readiness) */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-[#0F172A] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 transition-colors duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-status-red" />
              <h3 className="font-bold text-primary dark:text-white transition-colors">Recovery Readiness</h3>
            </div>
            <div className="group relative">
              <Info className="w-4 h-4 text-slate-400 cursor-help" />
              <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-primary dark:bg-slate-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                HRV is the gold standard for measuring if your nervous system has recovered — more reliable than how you "feel".
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-5xl font-black text-primary dark:text-white transition-colors">{athlete.hrv}</span>
              <span className="text-slate-400 text-sm ml-1">ms</span>
            </div>
            <div className="flex items-center gap-1 text-status-green font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+4% vs 7d avg</span>
            </div>
          </div>

          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={athlete.hrvTrend.map((v, i) => ({ v, i }))}>
                <Line 
                  type="monotone" 
                  dataKey="v" 
                  stroke="#00D4AA" 
                  strokeWidth={3} 
                  dot={false} 
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Card 3: Multi-Team Sync */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-[#0F172A] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 transition-colors duration-300"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-primary dark:text-white transition-colors">Universal Health Passport</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm transition-colors">
                  <span className="text-xs font-bold dark:text-white">ST</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors">School Team</span>
              </div>
              <div className="flex items-center gap-1 text-status-green font-bold text-xs">
                <div className="w-2 h-2 bg-status-green rounded-full" />
                Synced
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm transition-colors">
                  <span className="text-xs font-bold dark:text-white">CT</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors">Club Team</span>
              </div>
              <div className="flex items-center gap-1 text-status-green font-bold text-xs">
                <div className="w-2 h-2 bg-status-green rounded-full" />
                Synced
              </div>
            </div>
          </div>

          <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
            <p className="text-xs text-primary dark:text-accent font-medium leading-relaxed transition-colors">
              ⚠️ Coach Martinez hasn't received your school team load data. <button className="text-accent font-bold hover:underline">Tap to sync.</button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Load Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Training Load', value: athlete.load + '%', icon: Zap, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Sleep Quality', value: athlete.sleep + 'h', icon: Activity, color: 'text-status-green', bg: 'bg-status-green/10' },
          { label: 'Subjective Wellness', value: '4/5', icon: Heart, color: 'text-status-yellow', bg: 'bg-status-yellow/10' },
        ].map((metric, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-[#0F172A] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-colors duration-300"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", metric.bg)}>
              <metric.icon className={cn("w-6 h-6", metric.color)} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{metric.label}</p>
              <p className="text-2xl font-black text-primary dark:text-white transition-colors">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
