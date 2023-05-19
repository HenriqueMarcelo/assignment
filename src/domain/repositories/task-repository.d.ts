import { Task } from '../entities/Task'

export interface TaskRepository {
  create(props: Task): Promise<void>
  list(): Promise<Task[]>
  findById(id: string): Promise<Task | null>
  delete(task: Task): Promise<void>
  save(task: Task): Promise<void>
}
