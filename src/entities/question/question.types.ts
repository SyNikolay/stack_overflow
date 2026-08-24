export interface QuestionOwner {
  displayName: string;
  reputation: number | null;
  profileImage: string | null;
  link: string | null;
}

export interface Question {
  id: number;
  title: string;
  score: number;
  isAnswered: boolean;
  viewCount: number;
  answerCount: number;
  createdAt: number;
  lastActivityAt: number;
  link: string;
  tags: string[];
  owner: QuestionOwner;
}
