export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public priority: Priority = Priority.medium,
    public type: TaskType = 0,
    public deadline: Date
  ) {}
}

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export enum TaskType {
  pending,
  inProcess,
  completed,
}
