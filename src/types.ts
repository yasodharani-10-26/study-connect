export interface ExpertTopic {
  id: string;
  title: string;
  guide: string;
  keyTakeaways: string[];
  discussionPrompts: string[];
  teachingTips: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface JigsawActivity {
  id: string;
  title: string;
  description: string;
  topic: string;
  level: string;
  expertTopics: ExpertTopic[];
  reviewQuiz: QuizQuestion[];
  isCustom?: boolean;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  color: string;
  homeGroupId: string; // "1", "2", "3", "4"
  expertTopicId: string; // e.g., "topic-1", "topic-2", "topic-3", "topic-4"
  role: string; // "Facilitator", "Timekeeper", "Scribe", "Presenter"
  expertBriefingText?: string;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  type: 'home' | 'expert';
  topicId?: string; // links to expertTopics if expert group
  memberIds: string[];
}

export type JigsawPhase = 'intro' | 'home-1' | 'expert' | 'home-2' | 'quiz' | 'wrapup';
