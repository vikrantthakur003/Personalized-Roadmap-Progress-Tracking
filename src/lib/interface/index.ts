
export interface IUserProgress {
  _user: string;
  roadmapId: string;
  levelId: string;
  moduleIndex: number;
  completionStatus: boolean;
  timeSpent: number;
  userNotes: string;
  unlockedAchievements?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILevel {
  _id: string;
  _roadmap: string;
  levelNumber: number;
  levelName: string;
  modules: Array<{
    moduleIndex: number;
    title: string;
    description: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}