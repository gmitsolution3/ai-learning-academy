export interface ICompletedModule {
  module_id: string;
  completed_at: string;
}

export interface ITrack {
  certificate_issued: boolean;
  completed_at: null | string;
  completed_module: number;
  completed_modules: ICompletedModule[];
  enroll_date: string;
  is_completed: boolean;
  last_completed_at: string;
  total_modules: number;
}