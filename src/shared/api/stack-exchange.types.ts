export interface ShallowUserDto {
  account_id?: number;
  user_id?: number;
  display_name?: string;
  reputation?: number;
  profile_image?: string;
  link?: string;
  user_type?: string;
}

export interface QuestionDto {
  question_id: number;
  title: string;
  score: number;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  creation_date: number;
  last_activity_date: number;
  link: string;
  tags?: string[];
  owner?: ShallowUserDto;
}

export interface StackExchangeWrapper<T> {
  items?: T[];
  has_more?: boolean;
  quota_max?: number;
  quota_remaining?: number;
  error_message?: string;
}

export interface SearchQuestionsParams {
  intitle: string;
  fromDate: number;
  pageSize: number;
  signal?: AbortSignal;
}
