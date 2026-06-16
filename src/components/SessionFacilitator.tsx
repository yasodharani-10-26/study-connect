import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, BookOpen, BrainCircuit, Users, Check, AlertCircle, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import { JigsawActivity, ExpertTopic } from '../types';

interface SessionFacilitatorProps {
  activity: JigsawActivity | null;
}

type SessionStage = 'intro' | 'reading' | 'expert' | 'teaching' | 'quiz' | 'complete';

export default function SessionFacilitator({ activity }: SessionFacilitatorProps) {
  const [stage, setStage] = useState<SessionStage>('intro');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  
  // Timer States
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 min default
  const [timerMax, setTimerMax] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  // Quiz States
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Restart timer when stage changes
  useEffect(() => {
    if (stage === 'reading') {
      setTimerSeconds(180); // 3 mins for reading
      setTimerMax(180);
      setTimerRunning(false);
    } else if (stage === 'expert') {
      setTimerSeconds(300); // 5 mins for expert group
      setTimerMax(300);
      setTimerRunning(false);
    } else if (stage === 'teaching') {
      setTimerSeconds(240); // 4 mins per teaching turn
      setTimerMax(240);
      setTimerRunning(false);
    }
  }, [stage]);

  // Timer loop
  useEffect(() => {
    let interval: any;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  if (!activity) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm" id="facilitator-empty">
        <div className="text-5xl mb-4">🧩</div>
        <h3 className="text-xl font-bold text-slate-800">No Learning Packet Selected</h3>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          To launch interactive presentations, select a curriculum packet from our library or build a dynamic packet using AI.
        </p>
      </div>
    );
  }

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedOptionIndex(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedOptionIndex === null || quizSubmitted) return;
    
    const currentQuestion = activity.reviewQuiz[currentQuizIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const handleNextQuiz = () => {
    setQuizSubmitted(false);
    setSelectedOptionIndex(null);
    
    if (currentQuizIndex < activity.reviewQuiz.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setStage('complete');
      // Fire confetti celebration!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetQuiz = () => {
    setStage('intro');
    setCurrentQuizIndex(0);
    setSelectedOptionIndex(null);
    setQuizSubmitted(false);
    setScore(0);
  };

  const activeTopic: ExpertTopic = activity.expertTopics[activeTopicIndex] || activity.expertTopics[0];

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm overflow-hidden" id="facilitator-dashboard">
      {/* Session Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded leading-none">
              {activity.level}
            </span>
            <span className="text-slate-400 text-xs font-mono">• {activity.topic}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-1.5">{activity.title}</h2>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 self-start sm:self-auto shrink-0 select-none">
          {([
            { key: 'intro', label: '1. Setup' },
            { key: 'reading', label: '2. Read' },
            { key: 'expert', label: '3. Expert' },
            { key: 'teaching', label: '4. Teach' },
            { key: 'quiz', label: '5. Quiz' }
          ] as const).map((st) => (
            <button
              key={st.key}
              onClick={() => {
                setStage(st.key);
                if (st.key === 'quiz') {
                  setCurrentQuizIndex(0);
                  setSelectedOptionIndex(null);
                  setQuizSubmitted(false);
                  setScore(0);
                }
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                stage === st.key || (st.key === 'quiz' && stage === 'complete')
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Facilitator Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Presentation Core Viewport */}
        <div className="lg:col-span-8 bg-white border border-slate-200/70 rounded-2xl p-6 min-h-[460px] flex flex-col justify-between shadow-xs">
          
          <AnimatePresence mode="wait">
            {stage === 'intro' && (
              <motion.div
                key="facilitator-intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Phase 1: Activity Overview & Group Setup</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{activity.description}</p>
                </div>

                <div className="border border-slate-200/60 rounded-xl p-4.5 bg-slate-50/50">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-3">
                    Class Subtopic Assignments ({activity.expertTopics.length} Chapters)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activity.expertTopics.map((topic, idx) => (
                      <div 
                        key={topic.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl relative flex items-center gap-3 shadow-2xs"
                      >
                        <span className="h-6.5 w-6.5 font-bold text-xs bg-slate-100 rounded-md border border-slate-200/60 text-slate-500 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="font-bold text-xs text-slate-800 leading-tight">{topic.title}</h5>
                          <span className="text-[10px] text-slate-400 mt-1 block">Expert Group {idx + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-3">
                  <Users className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-indigo-800">Teacher's Script:</h4>
                    <p className="text-xs text-indigo-700/90 leading-relaxed mt-1">
                      "Class, today we are using the Jigsaw method. Everyone sits in their <strong>Home Groups</strong>. 
                      You will each receive a custom segment number. You are solely responsible for that segment. 
                      Next, you will study with your matching Experts, then come back and teach your group. Let's begin!"
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setStage('reading')}
                  className="px-5 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  Start Reading Session
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {stage === 'reading' && (
              <motion.div
                key="facilitator-reading"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Phase 2: Independent Focus Reading</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Pass out the expert guides (or display them on devices). Students spend a few minutes 
                    silently digesting their assigned card independently.
                  </p>
                </div>

                {/* Shared Timer Block */}
                <div className="flex flex-col items-center p-6 border border-slate-100 rounded-2xl bg-slate-50/50 max-w-sm mx-auto">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Silent study period</span>
                  <div className="text-4xl font-extrabold text-slate-800 font-mono my-2 tracking-widest">{formatTime(timerSeconds)}</div>
                  
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="p-2 cursor-pointer rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center h-10 w-10 shadow-xs"
                    >
                      {timerRunning ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(180);
                        setTimerRunning(false);
                      }}
                      className="p-2 cursor-pointer rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center h-10 w-10 shadow-xs"
                      title="Reset Timer"
                    >
                      <RotateCcw className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                    <AlertCircle className="h-4 w-4" /> Focus Pro Tip:
                  </h4>
                  <p className="text-xs text-amber-700/90 leading-relaxed">
                    Make sure classmates are reading their designated guides individually. Remind them to jot down 
                    confusing vocabulary questions to consult with their Expert Groups in the next stage.
                  </p>
                </div>

                <button 
                  onClick={() => setStage('expert')}
                  className="px-5 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  Convene Expert Groups
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {stage === 'expert' && (
              <motion.div
                key="facilitator-expert"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Phase 3: Expert Group Discussions</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Students gather in Experts to debate their shared study topic. Select a topic index below to display its dedicated study guide.
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap border-b border-slate-100 pb-3">
                  {activity.expertTopics.map((topic, idx) => (
                    <button
                      key={topic.id}
                      onClick={() => setActiveTopicIndex(idx)}
                      className={`px-3 py-1.5 cursor-pointer rounded-lg text-xs font-bold transition-all ${
                        activeTopicIndex === idx
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-200/50'
                      }`}
                    >
                      Group {idx + 1}: {topic.title}
                    </button>
                  ))}
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 max-h-[350px] overflow-y-auto font-sans leading-relaxed text-sm text-slate-700">
                  <ReactMarkdown
                    components={{
                      h2: ({node, ...props}) => <h2 className="text-lg font-bold text-slate-800 mt-4 mb-2 first:mt-0" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-bold text-indigo-700 mt-3 mb-1" {...props} />,
                      p: ({node, ...props}) => <p className="text-xs text-slate-600 mb-3" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-xs pl-2 mb-3 text-slate-600 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="text-xs" {...props} />
                    }}
                  >
                    {activeTopic.guide}
                  </ReactMarkdown>
                </div>

                {/* Expert prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50/50 border border-indigo-100/60 rounded-xl">
                    <h4 className="text-xs font-bold text-indigo-800 mb-2">Expert Group Discussion Prompts:</h4>
                    <ul className="text-xs text-indigo-700 pl-3 list-disc space-y-1.5 leading-snug">
                      {activeTopic.discussionPrompts.map((prompt, pIdx) => (
                        <li key={pIdx}>{prompt}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-emerald-50/50 border border-emerald-100/60 rounded-xl">
                    <h4 className="text-xs font-bold text-emerald-800 mb-2">Visual Analogies & Teaching Tips:</h4>
                    <ul className="text-xs text-emerald-700 pl-3 list-disc space-y-1.5 leading-snug">
                      {activeTopic.teachingTips.map((tip, tIdx) => (
                        <li key={tIdx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStage('teaching')}
                    className="px-5 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                  >
                    Initiate Peer Teaching
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {stage === 'teaching' && (
              <motion.div
                key="facilitator-teaching"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Phase 4: Individual Turn-Teaching</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Experts return to their original Home Group bases. Each taking turns, experts present their subtopics for 4 minutes.
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 border border-slate-100 rounded-2xl bg-slate-50/50 max-w-sm mx-auto">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Speaker Turn Pacer</span>
                  <div className="text-4xl font-extrabold text-slate-800 font-mono my-2 tracking-widest">{formatTime(timerSeconds)}</div>
                  
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="p-2 cursor-pointer rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center h-10 w-10 shadow-xs"
                    >
                      {timerRunning ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(240);
                        setTimerRunning(false);
                      }}
                      className="p-2 cursor-pointer rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center h-10 w-10 shadow-xs"
                      title="Reset Timer"
                    >
                      <RotateCcw className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-indigo-50/40">
                  <h4 className="text-xs font-bold text-indigo-800">Review Checklist for Teammates:</h4>
                  <ul className="text-xs text-indigo-700 pl-4 list-disc space-y-1.5 mt-2 leading-relaxed">
                    <li>Avoid reading summaries verbatim; prioritize using conversational explanations or board drawings.</li>
                    <li>Listeners must actively write notes and block secondary devices.</li>
                    <li>Each expert should end their Turn with: "Who has a question about what I just taught?"</li>
                  </ul>
                </div>

                <button 
                  onClick={() => setStage('quiz')}
                  className="px-5 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  Launch Team Assessment Quiz
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {stage === 'quiz' && (
              <motion.div
                key="facilitator-quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 lg:col-span-12"
              >
                <div className="flex justify-between items-center bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 text-xs font-bold text-indigo-700">
                  <span>Review Question {currentQuizIndex + 1} of {activity.reviewQuiz.length}</span>
                  <span>Active Score: {score}</span>
                </div>

                {(() => {
                  const currentQuestion = activity.reviewQuiz[currentQuizIndex];
                  return (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-snug">
                        {currentQuestion.question}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {currentQuestion.options.map((option, idx) => {
                          const isSelected = selectedOptionIndex === idx;
                          const isCorrect = idx === currentQuestion.correctIndex;
                          
                          let cardClasses = "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                          if (isSelected && !quizSubmitted) {
                            cardClasses = "border-indigo-600 bg-indigo-50/50 text-indigo-800 ring-2 ring-indigo-500/10";
                          } else if (quizSubmitted) {
                            if (isCorrect) {
                              cardClasses = "border-green-600 bg-green-50 text-green-800 font-bold";
                            } else if (isSelected) {
                              cardClasses = "border-red-600 bg-red-50 text-red-800 line-through";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleQuizAnswer(idx)}
                              disabled={quizSubmitted}
                              className={`text-left p-4 rounded-xl cursor-pointer text-xs font-semibold leading-relaxed transition-all flex items-center justify-between ${cardClasses}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && isCorrect && <Check className="h-4 w-4 text-green-600 shrink-0 ml-3" />}
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {quizSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl text-xs bg-slate-50 border border-slate-200 shadow-2xs mt-4"
                          >
                            <span className="font-bold text-slate-700 block mb-1">Pedagogical Explanation:</span>
                            <p className="text-slate-500 leading-relaxed text-[11px]">{currentQuestion.explanation}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        {!quizSubmitted ? (
                          <button
                            onClick={handleQuizSubmit}
                            disabled={selectedOptionIndex === null}
                            className={`px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
                              selectedOptionIndex === null
                                ? 'bg-slate-100 border border-slate-200 text-slate-400'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            Validate Answer
                          </button>
                        ) : (
                          <button
                            onClick={handleNextQuiz}
                            className="px-5 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2"
                          >
                            {currentQuizIndex < activity.reviewQuiz.length - 1 ? 'Next Challenge' : 'Complete Assessment'}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {stage === 'complete' && (
              <motion.div
                key="facilitator-complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 space-y-5"
              >
                <div className="text-5xl">🏆</div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Jigsaw Session Complete!</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-md mx-auto">
                    Outstanding participation! Your Home Group compiled the fragments of knowledge 
                    and completed the intellectual puzzle.
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl inline-block max-w-sm mx-auto text-left">
                  <p className="text-xs font-extrabold text-green-800 text-center">Mastery Verification Report</p>
                  <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                    <div className="text-center">
                      <span className="text-slate-400 text-[10px] block font-semibold leading-none">Questions Answered</span>
                      <span className="font-extrabold text-lg text-green-700 mt-1 block">{activity.reviewQuiz.length} / {activity.reviewQuiz.length}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-400 text-[10px] block font-semibold leading-none">Validation Index</span>
                      <span className="font-extrabold text-lg text-green-700 mt-1 block">{score} Correct</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-2">
                  <button
                    onClick={resetQuiz}
                    className="px-5 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-colors shadow-2xs cursor-pointer"
                  >
                    Restart Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Presentation Side Control Panel */}
        <div className="lg:col-span-4 bg-slate-100 border border-slate-200/60 rounded-2xl p-5">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-3">Live Instructor Console</span>
          
          <div className="space-y-4 text-xs font-sans">
            <div className="bg-white border rounded-xl p-3.5 shadow-2xs">
              <h4 className="font-bold text-slate-800">Current Phase</h4>
              <p className="font-bold text-indigo-600 text-sm mt-0.5 uppercase tracking-wide">
                {stage === 'intro' && '1. Team Setup'}
                {stage === 'reading' && '2. Silent Reading'}
                {stage === 'expert' && '3. Expert Groups'}
                {stage === 'teaching' && '4. Peer Lecture'}
                {stage === 'quiz' && '5. Final Quiz'}
                {stage === 'complete' && 'Activity Accomplished'}
              </p>
            </div>

            <div className="bg-white border rounded-xl p-3.5 shadow-2xs">
              <h4 className="font-bold text-slate-800">Facilitator Roles Assigned</h4>
              <ul className="text-slate-500 pl-4 list-disc space-y-1.5 mt-2 text-[11px] leading-relaxed">
                <li><strong className="text-slate-700">Moderator:</strong> Initiates rotation turns and ensures everyone speaks.</li>
                <li><strong className="text-slate-700">Timekeeper:</strong> Starts the timer on mobile/desktop and alerts at 1-minute left.</li>
                <li><strong className="text-slate-700">Scribe:</strong> Synthesizes verbal lessons into a beautiful shared layout diagram.</li>
                <li><strong className="text-slate-700">Presenter:</strong> Speaks on behalf of the group during general class wrap-up questions.</li>
              </ul>
            </div>

            <div className="bg-white border rounded-xl p-3.5 shadow-2xs">
              <h4 className="font-bold text-slate-800">Group Assessment Scores</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                Jigsaw classroom grading is group-dependent, motivating higher performing students to coach.
              </p>
              <div className="mt-3 text-[11px] bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-slate-600 space-y-1 font-medium">
                <p>💡 Formula: Class Score = Sum of Individual Scores.</p>
                <p>🏆 Reward: Top average groups earn "Classroom Master Certificates"!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
