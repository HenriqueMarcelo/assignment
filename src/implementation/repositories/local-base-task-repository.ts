import { Task } from '@/domain/entities/Task'
import { TaskRepository } from '@/domain/repositories/task-repository'
import { db } from '@/libs/local-base'

export class LocalBaseTaskRepository implements TaskRepository {
  items: Task[] = []

  async create(task: Task) {
    await db.collection('tasks').add(
      {
        id: task.id,
        name: task.name,
      },
      task.id,
    )
  }

  async list() {
    const tasks = await db.collection('tasks').get()
    return tasks
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
