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
    const task = await db.collection('tasks').doc(id).get()
    return task
  }

  async delete(task: Task) {
    await db.collection('tasks').doc(task.id).delete()
  }

  async save(task: Task) {
    await db.collection('tasks').doc(task.id).update({
      id: task.id,
      name: task.name,
    })
  }
}
