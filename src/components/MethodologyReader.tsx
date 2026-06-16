import React from 'react';
import { BookOpen, Award, ShieldAlert, Sparkles, Star, Anchor } from 'lucide-react';

export default function MethodologyReader() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8" id="methodology-handbook">
      {/* Hero Header */}
      <div className="border-b border-slate-100 pb-6 mb-8 text-center sm:text-left">
        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Pedagogical Guide
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
          The Jigsaw Method Handbook
        </h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Developed by Elliot Aronson in 1971 to break up racial barriers in desegregated schools, 
          the Jigsaw Method has become one of the most thoroughly validated cooperative learning frameworks in modern educational psychology.
        </p>
      </div>

      {/* Grid of Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/60">
          <div className="h-9 w-9 bg-blue-500 rounded-xl text-white flex items-center justify-center mb-3.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Individual Accountability</h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
            Although students work in groups, they sit for individual exams. This prevents "free-riding" 
            and ensures everyone is incentivized to listen, review notes, and truly comprehend.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100/60 font-sans">
          <div className="h-9 w-9 bg-purple-500 rounded-xl text-white flex items-center justify-center mb-3.5">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Positive Interdependence</h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
            Because each team member holds the exclusive key to one piece of the puzzle, 
            the group cannot reach maximum velocity without active participation from every single teammate.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/60">
          <div className="h-9 w-9 bg-emerald-500 rounded-xl text-white flex items-center justify-center mb-3.5">
            <Anchor className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Empathy & Listening</h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
            Since classmates are the exclusive teachers, students learn to practice deep, active listening, 
            supporting and coaching peers who might otherwise feel marginalized.
          </p>
        </div>
      </div>

      {/* Editorial Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        <div className="lg:col-span-8 space-y-6 text-slate-600 text-sm leading-relaxed">
          <section>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4.5 bg-indigo-600 rounded" />
              How to Orchestrate Jigsaw (Step-by-Step)
            </h3>
            <p className="mb-3">
              To host a successful Jigsaw exercise in a physical or remote classroom, follow this rigorous, 
              ten-step checklist developed by the Jigsaw Classroom Foundation:
            </p>
            <ol className="list-decimal list-inside space-y-2.5 pl-2 text-slate-600">
              <li>
                <strong className="text-slate-800">Assemble Home Groups:</strong> Divide students into diverse groups of 3 to 5 members. Let these represent their "Home Group" bases.
              </li>
              <li>
                <strong className="text-slate-800">Assign Roles:</strong> Appoint one student in each group as the Moderator/Facilitator. This person keeps the pacing moving and ensures balanced conversation.
              </li>
              <li>
                <strong className="text-slate-800">Divide the Material:</strong> Split the daily learning material into 3 to 5 matching subsections. (e.g., if learning about coal mines, divide by history, biology, engineering, and climate economics).
              </li>
              <li>
                <strong className="text-slate-800">Distribute Subtopics:</strong> Assign exactly one subsection card to each student in a Home Group. (So, Student A gets History, Student B gets Biology, etc.).
              </li>
              <li>
                <strong className="text-slate-800">Allocate Reading Time:</strong> Give students 5-10 minutes of quiet, independent reading to digest their assigned material. They do not consult teammates yet.
              </li>
              <li>
                <strong className="text-slate-800">Form Expert Groups:</strong> Instruct all students with the <em className="italic">same</em> subtopic assignment to match tables (e.g. all history cardholders sit together). This is the **Expert Group**.
              </li>
              <li>
                <strong className="text-slate-800">Discuss in Expert Groups:</strong> Experts spend 10-15 minutes comparing notes, clarifying confusing details, and planning how they will teach this to their home groups.
              </li>
              <li>
                <strong className="text-slate-800">The Homeward Return:</strong> Reconvene students into their original Home Groups.
              </li>
              <li>
                <strong className="text-slate-800">Deliver Peer Lectures:</strong> Each expert takes 3-4 minutes to present their subtopic. Encourage others to take detailed notes, draw diagrams, and ask clarifying questions.
              </li>
              <li>
                <strong className="text-slate-800">Verify Mastery:</strong> Administer a short individual quiz testing knowledge of ALL topics to close the loop.
              </li>
            </ol>
          </section>
        </div>

        {/* Side Panel: Handling Classroom Obstacles */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200/60 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
            <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />
            Overcoming Group Obstacles
          </h4>

          <div className="space-y-4">
            <div className="border-b border-slate-200/60 pb-3">
              <h5 className="text-xs font-bold text-slate-700">Problem 1: The Dominator</h5>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">
                A highly talkative student dominates presentations, preventing quiet teammates from speaking.
              </p>
              <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                👉 Fix: Reinforce the Facilitator's role. Instruct the group that each presenter has 
                a strict 3-minute stopwatch limit, and that every teammate must ask exactly 1 query.
              </p>
            </div>

            <div className="border-b border-slate-200/60 pb-3">
              <h5 className="text-xs font-bold text-slate-700">Problem 2: The Struggling Reader</h5>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">
                A student has lower literacy skills or struggles to comprehend their expert guide.
              </p>
              <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                👉 Fix: The Expert Group stage is the remedy! Before presenting, they discuss with 
                other students holding the exact same topic, where stronger peers explain and co-write teaching points.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-700">Problem 3: Student Absences</h5>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">
                A student is absent, meaning their jigsaw segment is completely missing from the table.
              </p>
              <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                👉 Fix: Keep a "Jigsaw Library Cabinet" (or use our digital packets!). Allow adjacent groups 
                to lend their expert summary sheets, or have an teacher act as the temporary proxy expert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
