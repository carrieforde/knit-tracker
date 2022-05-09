import { ICounters } from "./counter.type";

export interface IProject {
  slug: string;
  name: string;
  counters: ICounters;
  progress: number;
  status: IProjectStatus;
  timestamps: IProjectTimestamps;
}

export enum IProjectStatus {
  notStarted = "Not Started",
  inProgress = "In Progress",
  complete = "Complete",
}

export interface IProjectTimestamps {
  started: string | null;
  completed: string | null;
  updated: string | null;
}
