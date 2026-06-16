import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, BookOpen, Users, Zap, Award, Sparkles, Star, Puzzle, FileText, CheckCircle } from 'lucide-react';
import { JigsawActivity } from './types';
import { PRESET_ACTIVITIES } from './templates';
import ClassroomSimulator from './components/ClassroomSimulator';
import MethodologyReader from './components/MethodologyReader';
import PacketBuilder from './components/PacketBuilder';
import SessionFacilitator from './components/SessionFacilitator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'builder' | 'facilitator'>('simulator');
  const [currentActivity, setCurrentActivity] = useState<JigsawActivity | null>(null);
  const [customActivities, setCustomActivities] = useState<JigsawActivity[]>([]);

  // Load custom activities from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jigsaw_custom_activities');
      if (saved) {
        setCustomActivities(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage lookup failed", e);
    }
    // Set default activity
    if (PRESET_ACTIVITIES.length > 0) {
      setCurrentActivity(PRESET_ACTIVITIES[0]);
    }
  }, []);

  const handleSelectActivity = (act: JigsawActivity) => {
    setCurrentActivity(act);
    // Transition nicely to facilitator or let them stay
    setActiveTab('facilitator');
  };

  const handleAddCustomActivity = (newAct: JigsawActivity) => {
    const updated = [newAct, ...customActivities];
    setCustomActivities(updated);
    try {
      localStorage.setItem('jigsaw_custom_activities', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  };

  const handleRemoveCustomActivity = (id: string) => {
    const updated = customActivities.filter(a => a.id !== id);
    setCustomActivities(updated);
    try {
      localStorage.setItem('jigsaw_custom_activities', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
    // If the active activity was deleted, fall back
    if (currentActivity?.id === id) {
      setCurrentActivity(PRESET_ACTIVITIES[0] || null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="jigsaw-workspace">
      {/* Prime Header Block */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <Puzzle className="h-5.5 w-5.5 rotate-45" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Co-Jigsaw
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full select-none">
                  Collaborative Hub
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Elliott Aronson's Classroom Cooperative Lab</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto select-none">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'simulator'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Class Sandbox
            </button>
            
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'builder'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              AI Deck Architect
            </button>
            
            <button
              onClick={() => setActiveTab('facilitator')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'facilitator'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="h-4 w-4" />
              Live Presentation
              {currentActivity && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Alert mapping active selection */}
        {currentActivity && activeTab !== 'facilitator' && (
          <div className="bg-slate-900 text-white rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/30">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-[10px] bg-indigo-500 text-white font-bold uppercase tracking-wider px-2 py-0.5 rounded leading-none">
                  Active Session Deck
                </span>
                <h4 className="text-sm font-bold tracking-tight text-slate-100 mt-1">{currentActivity.title}</h4>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('facilitator')}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Launch Live Session
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'simulator' && (
            <motion.div
              key="simulator-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 animate-none"
            >
              <ClassroomSimulator />
              <MethodologyReader />
            </motion.div>
          )}

          {activeTab === 'builder' && (
            <motion.div
              key="builder-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <PacketBuilder 
                currentActivity={currentActivity}
                onSelectActivity={handleSelectActivity}
                customActivities={customActivities}
                onAddCustomActivity={handleAddCustomActivity}
                onRemoveCustomActivity={handleRemoveCustomActivity}
              />
            </motion.div>
          )}

          {activeTab === 'facilitator' && (
            <motion.div
              key="facilitator-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <SessionFacilitator activity={currentActivity} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Humble professional Brand Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-400 select-none">
        <p className="font-mono">Created with dynamic React, Tailwind v4 and Google GenAI.</p>
        <p className="mt-1 font-mono">Co-Jigsaw Platform © 1971-2026. Elliot Aronson Pedagogical Model.</p>
      </footer>
    </div>
  );
}
