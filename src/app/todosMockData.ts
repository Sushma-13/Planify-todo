import { Priority, Task } from './models/task';

const data: Task[] = [
  {
    id: 1,
    title: 'Call Dad',
    description: '',
    priority: Priority.high,
    type: 0,
    deadline: new Date(),
  },
  {
    id: 2,
    title: 'Maths assignment',
    description: '',
    priority: Priority.medium,
    type: 0,
    deadline: new Date(),
  },
  {
    id: 3,
    title: 'Buy Milk',
    description: '',
    priority: Priority.medium,
    type: 1,
    deadline: new Date(),
  },
  {
    id: 4,
    title: 'Call Friend',
    description: '',
    priority: Priority.low,
    type: 2,
    deadline: new Date(),
  },
];
export default data;
