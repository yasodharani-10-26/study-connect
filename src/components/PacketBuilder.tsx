import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Library, FileText, ChevronRight, CheckCircle2, RotateCw, HelpCircle, AlertCircle, Trash2 } from 'lucide-react';
import { JigsawActivity } from '../types';
import { PRESET_ACTIVITIES } from '../templates';

interface PacketBuilderProps {
  currentActivity: JigsawActivity | null;
  onSelectActivity: (activity: JigsawActivity) => void;
  customActivities: JigsawActivity[];
  onAddCustomActivity: (activity: JigsawActivity) => void;
  onRemoveCustomActivity: (id: string) => void;
}

export default function PacketBuilder({
  currentActivity,
  onSelectActivity,
  customActivities,
  onAddCustomActivity,
  onRemoveCustomActivity
}: PacketBuilderProps) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('High School');
  const [count, setCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [apiIsConfigured, setApiIsConfigured] = useState<boolean | null>(null);

  const loadingSteps = [
    "Analyzing core topic structure...",
    "Dividing curriculum logically into equal expert segments...",
    "Drafting rich, grade-appropriate study guide briefing sheets...",
    "Crafting expert group discussion prompts & team-teaching tips...",
    "Designing self-assessment quiz index parameters...",
    "Finalizing beautiful Jigsaw learning package!"
  ];

  // Check if API key is configured on server
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        setApiIsConfigured(data.isConfigured);
      })
      .catch((err) => {
        console.error("Config check failed", err);
        setApiIsConfigured(false);
      });
  }, []);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 3500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-jigsaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count, level })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Generation crashed");
      }

      const generatedActivity: JigsawActivity = {
        ...data,
        id: `ai-activity-${Date.now()}`,
        isCustom: true
      };

      onAddCustomActivity(generatedActivity);
      onSelectActivity(generatedActivity);
      setTopic('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while designing your custom Jigsaw. Ensure your GEMINI_API_KEY is configured.");
    } finally {
      setLoading(false);
    }
  };

  const allActivities = [...PRESET_ACTIVITIES, ...customActivities];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="activity-builder">
      {/* Configuration Form Column */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Form Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">AI Generator Tool</span>
          </div>

          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Create a Custom Jigsaw Packet</h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            Type any topic or upload a syllabus. Our server-side AI model will construct a multi-segment learning handbook.
          </p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label htmlFor="topic-input" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase font-mono">
                Learning Topic / Concept
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, Photosynthesis Basics, Black Holes"
                disabled={loading}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="level-select" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase font-mono">
                  Target Grade
                </label>
                <select
                  id="level-select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs focus:border-indigo-500 focus:outline"
                >
                  <option value="Elementary School">Elementary School</option>
                  <option value="Middle School">Middle School</option>
                  <option value="High School">High School</option>
                  <option value="College / University">University / Professional</option>
                </select>
              </div>

              <div>
                <label htmlFor="count-select" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase font-mono">
                  Expert Groups
                </label>
                <select
                  id="count-select"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs focus:border-indigo-500 focus:outline animate-none"
                >
                  <option value={3}>3 Chapters (3 Experts)</option>
                  <option value={4}>4 Chapters (4 Experts)</option>
                  <option value={5}>5 Chapters (5 Experts)</option>
                </select>
              </div>
            </div>

            {apiIsConfigured === false && (
              <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-800 leading-normal">
                  <p className="font-bold">Gemini API Key Needed</p>
                  <p className="mt-0.5 text-amber-700/90">
                    To generate custom AI packets, paste a valid key under **Settings &gt; Secrets**. 
                    In the meantime, feel free to use our pre-built library packs!
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className={`w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-slate-100 text-slate-400 border border-slate-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-98'
              }`}
            >
              {loading ? (
                <>
                  <RotateCw className="h-4 w-4 animate-spin text-indigo-600" />
                  Generating Materials...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Create AI Jigsaw Package
                </>
              )}
            </button>
          </form>

          {/* AI Generation State Overlay */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Step {loadingStep + 1} of {loadingSteps.length}</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce delay-200" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce delay-300" />
                  </div>
                </div>
                
                <h4 className="text-xs font-bold text-indigo-700 leading-snug animate-pulse">
                  {loadingSteps[loadingStep]}
                </h4>
                
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-indigo-600 h-full rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-700 leading-normal">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Package Library Column */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Library className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Learning Deck Library</span>
            </div>
            <span className="text-xs px-2.5 py-0.5 bg-slate-100 border border-slate-200/60 font-semibold text-slate-500 rounded-full">
              {allActivities.length} Available Packets
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-800">Choose a Presentation Lesson Deck</h3>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Select a learning concept from the lists below, then navigate to "Presentation Mode" to run class sessions.
          </p>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {allActivities.map((act) => {
              const isSelected = currentActivity?.id === act.id;
              return (
                <div
                  key={act.id}
                  onClick={() => onSelectActivity(act)}
                  className={`border p-4 rounded-xl transition-all cursor-pointer relative flex flex-col justify-between group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded leading-none ${
                          act.isCustom 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        }`}>
                          {act.isCustom ? 'AI Generated' : 'Preset Pack'}
                        </span>
                        
                        <span className="text-[10px] text-slate-500 font-medium">
                          {act.level}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-800 tracking-tight mt-2 flex items-center gap-1.5">
                        {act.title}
                        {isSelected && <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600 shrink-0" />}
                      </h4>

                      <p className="text-xs text-slate-500 leading-snug mt-1.5 line-clamp-2">
                        {act.description}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-3 border-t border-slate-100/60 font-mono">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      Chapters: {act.expertTopics.length} sections
                    </span>

                    {act.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveCustomActivity(act.id);
                        }}
                        className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 flex items-center gap-1 transition-colors pointer-events-auto"
                        title="Delete Packet"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
