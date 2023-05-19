import { Task } from '../../entities/Task'
import { TaskRepository } from '../../repositories/task-repository'

export class InMemoryTaskRepository implements TaskRepository {
  items: Task[] = []

  async create(task: Task) {
    this.items.push(task)
  }
}
