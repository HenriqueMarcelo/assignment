import { Task } from '../entities/Task'

export interface TaskRepository {
  create(props: Task): Promise<void>
  list(): Promise<Task[]>
}
