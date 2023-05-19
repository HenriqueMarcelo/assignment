import { Task } from '../../entities/Task'
import { TaskRepository } from '../../repositories/task-repository'

export class InMemoryTaskRepository implements TaskRepository {
  items: Task[] = []

  async create(task: Task) {
    this.items.push(task)
  }

  async list() {
    return this.items
  }

  async findById(id: string) {
    const task = this.items.find((item) => item.id.toString() === id)

    if (!task) {
      return null
    }

    return task
  }

  async delete(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)
    this.items.splice(itemIndex, 1)
  }

  async save(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)

    this.items[itemIndex] = task
  }
}
