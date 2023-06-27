export interface Task {
  title: string;
  description: string;
  status: {
    type: String;
    enum: ['Todo', 'InProgress', 'Completed'];
  };
  createdAt: Date;
}
