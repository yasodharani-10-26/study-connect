import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Users, HelpCircle, ArrowRight, RefreshCw, Zap, Award, Info } from 'lucide-react';
import { Student, JigsawPhase } from '../types';

const INITIAL_STUDENTS: Student[] = [
  // Home Group 1
  { id: 's1', name: 'Alex', avatar: '👨‍💻', color: '#3b82f6', homeGroupId: '1', expertTopicId: 'topic-1', role: 'Facilitator' },
  { id: 's2', name: 'Bella', avatar: '👩‍🎨', color: '#a855f7', homeGroupId: '1', expertTopicId: 'topic-2', role: 'Timekeeper' },
  { id: 's3', name: 'Chris', avatar: '👨‍🔬', color: '#10b981', homeGroupId: '1', expertTopicId: 'topic-3', role: 'Scribe' },
  { id: 's4', name: 'Diana', avatar: '👩‍🏫', color: '#f59e0b', homeGroupId: '1', expertTopicId: 'topic-4', role: 'Presenter' },
  
  // Home Group 2
  { id: 's5', name: 'Ethan', avatar: '👨‍🚀', color: '#3b82f6', homeGroupId: '2', expertTopicId: 'topic-1', role: 'Presenter' },
  { id: 's6', name: 'Fiona', avatar: '👩‍⚕️', color: '#a855f7', homeGroupId: '2', expertTopicId: 'topic-2', role: 'Facilitator' },
  { id: 's7', name: 'Gavin', avatar: '👨‍🌾', color: '#10b981', homeGroupId: '2', expertTopicId: 'topic-3', role: 'Timekeeper' },
  { id: 's8', name: 'Helen', avatar: '👩‍💻', color: '#f59e0b', homeGroupId: '2', expertTopicId: 'topic-4', role: 'Scribe' },

  // Home Group 3
  { id: 's9', name: 'Ian', avatar: '👨‍🍳', color: '#3b82f6', homeGroupId: '3', expertTopicId: 'topic-1', role: 'Scribe' },
  { id: 's10', name: 'Julia', avatar: '👩‍🚀', color: '#a855f7', homeGroupId: '3', expertTopicId: 'topic-2', role: 'Presenter' },
  { id: 's11', name: 'Kevin', avatar: '👨‍🎨', color: '#10b981', homeGroupId: '3', expertTopicId: 'topic-3', role: 'Facilitator' },
  { id: 's12', name: 'Lia', avatar: '👩‍🔬', color: '#f59e0b', homeGroupId: '3', expertTopicId: 'topic-4', role: 'Timekeeper' },

  // Home Group 4
  { id: 's13', name: 'Marcus', avatar: '👨‍⚕️', color: '#3b82f6', homeGroupId: '4', expertTopicId: 'topic-1', role: 'Timekeeper' },
  { id: 's14', name: 'Nora', avatar: '👩‍🌾', color: '#a855f7', homeGroupId: '4', expertTopicId: 'topic-2', role: 'Scribe' },
  { id: 's15', name: 'Owen', avatar: '👨‍🏫', color: '#10b981', homeGroupId: '4', expertTopicId: 'topic-3', role: 'Presenter' },
  { id: 's16', name: 'Paige', avatar: '👩‍🍳', color: '#f59e0b', homeGroupId: '4', expertTopicId: 'topic-4', role: 'Facilitator' },
];

const EXPERT_TOPICS = [
  { id: 'topic-1', title: 'Blue Segment', color: '#3b82f6', theme: 'sky' },
  { id: 'topic-2', title: 'Purple Segment', color: '#a855f7', theme: 'purple' },
  { id: 'topic-3', title: 'Emerald Segment', color: '#10b981', theme: 'emerald' },
  { id: 'topic-4', title: 'Amber Segment', color: '#f59e0b', theme: 'amber' },
];

export default function ClassroomSimulator() {
  const [phase, setPhase] = useState<JigsawPhase>('intro');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const phasesList: { key: JigsawPhase; title: string; desc: string; icon: any }[] = [
    { 
      key: 'intro', 
      title: '1. Orientation', 
      desc: 'Introduce the main curriculum and explain the physical jigsaw journey.',
      icon: BookOpen 
    },
    { 
      key: 'home-1', 
      title: '2. Home Groups', 
      desc: 'Students receive 1 specific segment of the overall material.',
      icon: Users 
    },
    { 
      key: 'expert', 
      title: '3. Expert Groups', 
      desc: 'Identical experts assemble to master, clarify, and plan teaching.',
      icon: Zap 
    },
    { 
      key: 'home-2', 
      title: '4. Synthesis', 
      desc: 'Experts return home to teach teammates their respective fields.',
      icon: RefreshCw 
    },
    { 
      key: 'quiz', 
      title: '5. Assessment', 
      desc: 'An individual quiz tests comprehension of ALL topics.',
      icon: Award 
    }
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPhase((prev) => {
          if (prev === 'intro') return 'home-1';
          if (prev === 'home-1') return 'expert';
          if (prev === 'expert') return 'home-2';
          if (prev === 'home-2') return 'quiz';
          return 'intro';
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 shadow-sm overflow-hidden" id="simulation-lab">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Interactive Visual Lab
          </span>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight mt-1.5">
            The Classroom Seating Simulator
          </h2>
          <p className="text-sm text-slate-500">
            Click through the phases below to watch the physical and intellectual migration of 16 students.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
              isPlaying 
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-amber-500' : 'bg-green-400'}`}></span>
            </span>
            {isPlaying ? 'Pause Auto-Drive' : 'Auto-Drive Simulation'}
          </button>
          
          <button
            onClick={() => {
              setPhase('intro');
              setIsPlaying(false);
              setSelectedStudent(null);
            }}
            className="p-2 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Reset Simulator"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {phasesList.map((p) => {
          const IconComponent = p.icon;
          const isActive = phase === p.key;
          return (
            <button
              key={p.key}
              id={`step-${p.key}`}
              onClick={() => {
                setPhase(p.key);
                setIsPlaying(false);
              }}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-24 ${
                isActive 
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                  : 'border-slate-200 bg-white hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <IconComponent className={`h-4.5 w-4.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />}
              </div>
              <div>
                <p className={`text-xs font-bold ${isActive ? 'text-indigo-700' : 'text-slate-700'}`}>{p.title}</p>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">{p.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Sandbox Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lab Grid Stage */}
        <div className="lg:col-span-8 bg-white border border-slate-200/70 rounded-2xl p-6 min-h-[420px] flex flex-col justify-between relative shadow-inner">
          <div className="absolute top-3 right-3 text-[10px] uppercase font-mono text-slate-400 px-2.5 py-1 bg-slate-100 rounded-md">
            Stage Viewport
          </div>

          <div className="flex-1 flex flex-col justify-center items-center">
            {phase === 'intro' ? (
              /* Phase 1: Intro Classroom Setup */
              <div className="w-full text-center py-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-4xl mb-3">🏫</div>
                  <h3 className="text-lg font-bold text-slate-800">Classroom Setup & Orientation</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    16 students sit at their standard homework desk rows. The teacher introduces the full curriculum 
                    (e.g., Cryptography, Cells). No Jigsaw groups are configured yet.
                  </p>
                  <p className="text-xs text-indigo-600 font-medium mt-4 bg-indigo-50/70 inline-block px-3.5 py-1.5 rounded-lg border border-indigo-100">
                    Click the next step "Home Groups" to initiate teamwork!
                  </p>
                </motion.div>

                {/* Grid of students in parallel benches */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 max-w-2xl mx-auto mt-8">
                  {INITIAL_STUDENTS.map((student) => (
                    <motion.button
                      key={student.id}
                      layoutId={`student-${student.id}`}
                      onClick={() => setSelectedStudent(student)}
                      className={`flex flex-col items-center p-2 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer group ${
                        selectedStudent?.id === student.id ? 'ring-2 ring-indigo-500 bg-indigo-50/20' : ''
                      }`}
                    >
                      <span className="text-2xl mb-1">{student.avatar}</span>
                      <span className="text-[10px] font-semibold text-slate-700">{student.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : phase === 'home-1' || phase === 'home-2' ? (
              /* Phase 2 or 4: Home Groups Arrangement */
              <div className="w-full">
                <div className="text-center mb-6">
                  <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    Home Groups Active
                  </span>
                  <h3 className="text-sm font-bold text-slate-600 mt-1">
                    {phase === 'home-1' 
                      ? "Each group has 4 unique colored stickers. Each color represents 1 special Expert Topic." 
                      : "Experts have returned to their base cells! Each team member teaches their chapter piece."}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {['1', '2', '3', '4'].map((homeId) => {
                    const members = INITIAL_STUDENTS.filter(s => s.homeGroupId === homeId);
                    return (
                      <div 
                        key={`home-group-${homeId}`}
                        className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/50 flex flex-col min-h-[140px] relative"
                      >
                        <span className="absolute -top-2.5 -left-1 px-2.5 py-0.5 bg-slate-700 text-white rounded-md text-[10px] font-bold">
                          Home Group {homeId}
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2 flex-grow items-center justify-items-center">
                          {members.map((student) => (
                            <motion.button
                              key={student.id}
                              layoutId={`student-${student.id}`}
                              onClick={() => setSelectedStudent(student)}
                              className={`flex items-center gap-1.5 p-1.5 w-full rounded-lg bg-white border border-slate-200/60 shadow-xs hover:border-slate-300 relative cursor-pointer ${
                                selectedStudent?.id === student.id ? 'ring-2 ring-indigo-500' : ''
                              }`}
                            >
                              <div 
                                className="w-2.5 h-2.5 rounded-full shrink-0" 
                                style={{ backgroundColor: student.color }} 
                                title={`Expert Topic: ${student.expertTopicId}`}
                              />
                              <span className="text-xs font-semibold text-slate-700 truncate">{student.name}</span>
                              <span className="text-[10px] text-slate-400 shrink-0 select-none">{student.avatar}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : phase === 'expert' ? (
              /* Phase 3: Expert Groups Arrangement */
              <div className="w-full">
                <div className="text-center mb-6">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    Expert Groups Gathering
                  </span>
                  <h3 className="text-sm font-bold text-slate-600 mt-1">
                    Students of the same color pool resources to master a shared chapter.
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {EXPERT_TOPICS.map((topic) => {
                    const members = INITIAL_STUDENTS.filter(s => s.expertTopicId === topic.id);
                    return (
                      <div 
                        key={`expert-group-${topic.id}`}
                        className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/20 flex flex-col min-h-[145px] relative"
                      >
                        <span 
                          className="absolute -top-2.5 -left-1 px-2.5 py-0.5 text-white rounded-md text-[10px] font-bold"
                          style={{ backgroundColor: topic.color }}
                        >
                          Expert Group: {topic.id === 'topic-1' ? 'Blue' : topic.id === 'topic-2' ? 'Purple' : topic.id === 'topic-3' ? 'Emerald' : 'Amber'} Theme
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2 flex-grow items-center justify-items-center">
                          {members.map((student) => (
                            <motion.button
                              key={student.id}
                              layoutId={`student-${student.id}`}
                              onClick={() => setSelectedStudent(student)}
                              className={`flex items-center gap-1.5 p-1.5 w-full rounded-lg bg-white border border-slate-200/60 shadow-xs hover:border-slate-300 cursor-pointer ${
                                selectedStudent?.id === student.id ? 'ring-2 ring-indigo-500' : ''
                              }`}
                            >
                              <span className="text-[9px] uppercase font-mono px-1 bg-slate-100 rounded text-slate-500 font-bold shrink-0">
                                G{student.homeGroupId}
                              </span>
                              <span className="text-xs font-semibold text-slate-700 truncate">{student.name}</span>
                              <span className="text-[10px] text-slate-400 shrink-0">{student.avatar}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Phase 5: Individual Quiz Arena */
              <div className="w-full text-center py-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-lg font-bold text-slate-800">Self-Assessment Challenge</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Now, the teachers hand out the individual assessment. Collaborative conversations pause. 
                    Because they only read 1/4 of the pages directly, students must rely on what was taught to them or their notes.
                  </p>
                  
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-left">
                    <div className="p-2 bg-green-500 rounded-lg text-white">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-800">Individual & Team Accountability</p>
                      <p className="text-[11px] text-green-700 leading-snug">
                        By averaging the individual scores of a Home Group, teachers can issue "Group Mastery Certificates"!
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Rows showing students taking the test */}
                <div className="grid grid-cols-8 gap-3 max-w-lg mx-auto mt-8">
                  {INITIAL_STUDENTS.map((student) => (
                    <motion.div
                      key={student.id}
                      layoutId={`student-${student.id}`}
                      className="bg-white p-1 rounded-lg border border-slate-200 flex flex-col items-center relative"
                    >
                      <span className="text-sm">{student.avatar}</span>
                      <span className="text-[8px] font-semibold text-slate-500 mt-0.5 truncate max-w-full">{student.name}</span>
                      <span className="text-[7px] text-green-600 font-bold bg-green-100 px-1 rounded-sm border border-green-200 mt-1">Quiz</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phase-specific help footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">Total Roster: 16 Students, 4 Groups</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> <span className="text-[10px]">Topic 1</span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> <span className="text-[10px]">Topic 2</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> <span className="text-[10px]">Topic 3</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> <span className="text-[10px]">Topic 4</span>
            </div>
          </div>
        </div>

        {/* Info Feed Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-indigo-300">
              <Info className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">What happens now?</span>
            </div>
            
            {phase === 'intro' && (
              <div>
                <h4 className="font-bold text-base">Class Orientation</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  The teacher welcomes students, defines the large topic, and structures 16 individuals into 4 initial groups. 
                  Each student is issued a role and a numeric topic sticker.
                </p>
                <div className="bg-indigo-950/50 border border-indigo-800 rounded-lg p-3 mt-4 text-[11px]">
                  <p className="font-bold text-indigo-400">Pedagogy Insight:</p>
                  <p className="text-slate-300 mt-0.5">
                    "Before dividing, ensure students understand that they are teammates, not competitors. They depend entirely on each other."
                  </p>
                </div>
              </div>
            )}

            {phase === 'home-1' && (
              <div>
                <h4 className="font-bold text-base">Home Groups Meet</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Home groups are formed. Each is a micro-classroom of diverse ideas. 
                  Every student looks at their color code. They recognize that they hold the key to a specific topic card.
                </p>
                <div className="bg-indigo-950/50 border border-indigo-800 rounded-lg p-3 mt-4 text-[11px]">
                  <p className="font-bold text-indigo-400">Facilitator Duty:</p>
                  <p className="text-slate-300 mt-0.5">
                    "Allocate 2 minutes for Home Groups to write down what they already know about the general topic."
                  </p>
                </div>
              </div>
            )}

            {phase === 'expert' && (
              <div>
                <h4 className="font-bold text-base">Expert Groups Collaborate</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Students physically migrate to pool with all others of the matching color. 
                  Here, the heavy lifting occurs: checking sources, debating interpretation, and designing a clear lesson plan.
                </p>
                <div className="bg-indigo-950/50 border border-indigo-800 rounded-lg p-3 mt-4 text-[11px]">
                  <p className="font-bold text-indigo-400">The Power of Experts:</p>
                  <p className="text-slate-300 mt-0.5">
                    "This safety net protects struggling students! They master the topic with others before teaching it to their hometown peers."
                  </p>
                </div>
              </div>
            )}

            {phase === 'home-2' && (
              <div>
                <h4 className="font-bold text-base">The Homeward Return</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Armed with confidence and cheat sheets, students return to original home cells. 
                  Each expert gets 3 uninterrupted minutes to teach. Teammates must take notes and ask questions.
                </p>
                <div className="bg-indigo-950/50 border border-indigo-800 rounded-lg p-3 mt-4 text-[11px]">
                  <p className="font-bold text-indigo-400">Peer Instruction:</p>
                  <p className="text-slate-300 mt-0.5">
                    "Students learn more when they are preparing to teach. The act of summarizing turns concepts from short-term memory to wisdom."
                  </p>
                </div>
              </div>
            )}

            {phase === 'quiz' && (
              <div>
                <h4 className="font-bold text-base">Individual Assessment</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  The test is individual. No helping is allowed now! 
                  Since they did not read the other chapters directly, their score hinges on how well their peers taught them.
                </p>
                <div className="bg-indigo-950/50 border border-indigo-800 rounded-lg p-3 mt-4 text-[11px]">
                  <p className="font-bold text-indigo-400">Aronson's Genius:</p>
                  <p className="text-slate-300 mt-0.5">
                    "Individual tests prevent 'free-riding'. Successful groups ensure that EVERY single member masters the core concept."
                  </p>
                </div>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {selectedStudent ? (
              <motion.div 
                key={selectedStudent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl p-4.5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedStudent.avatar}</span>
                  <div>
                    <h5 className="font-bold text-slate-800 leading-tight">{selectedStudent.name}</h5>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Student Profile</p>
                  </div>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="ml-auto text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-medium">Home Cell</span>
                    <span className="font-bold text-slate-700">Group {selectedStudent.homeGroupId}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-medium">Topic Color</span>
                    <span className="font-bold flex items-center gap-1.5 text-slate-700">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedStudent.color }} />
                      {selectedStudent.expertTopicId === 'topic-1' && 'Blue'}
                      {selectedStudent.expertTopicId === 'topic-2' && 'Purple'}
                      {selectedStudent.expertTopicId === 'topic-3' && 'Emerald'}
                      {selectedStudent.expertTopicId === 'topic-4' && 'Amber'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 col-span-2">
                    <span className="text-slate-400 text-[10px] block font-medium">Active Classroom Role</span>
                    <span className="font-bold text-indigo-600">{selectedStudent.role}</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-xs">
                  <p className="font-bold text-slate-800">Current Task State:</p>
                  <p className="text-slate-500 italic mt-1 leading-snug">
                    {phase === 'intro' && `"${selectedStudent.name} is listening to the teacher introduce the general Jigsaw goals..."`}
                    {phase === 'home-1' && `"${selectedStudent.name} is looking at their sticker and discussing baseline knowledge with Home Group ${selectedStudent.homeGroupId}..."`}
                    {phase === 'expert' && `"${selectedStudent.name} is sitting inside the Expert Section, researching ${selectedStudent.expertTopicId === 'topic-1' ? 'IP routing' : selectedStudent.expertTopicId === 'topic-2' ? 'DNS phonebooks' : selectedStudent.expertTopicId === 'topic-3' ? 'HTTP servers' : 'packet security'} and preparing visual analogies..."`}
                    {phase === 'home-2' && `"${selectedStudent.name} has returned to Home Group ${selectedStudent.homeGroupId} and is taking active notes while peer experts present..."`}
                    {phase === 'quiz' && `"${selectedStudent.name} is silently answering the multiple-choice self-test on the screen, reflecting on what was taught..."`}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 flex flex-col justify-center items-center flex-grow min-h-[160px]">
                <Users className="h-6 w-6 text-slate-300 mb-2" />
                <p className="text-xs font-semibold">Click on any student</p>
                <p className="text-[10px] text-slate-400 mt-1">To view their localized timeline, physical seating, and classroom role dynamics.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
