import { Assignable } from '@/domain/entities/Assignable'
import { AssignableRepository } from '@/domain/repositories/assignable-repository'
import { db } from '@/libs/local-base'

export class LocalBaseAssignableRepository implements AssignableRepository {
  async create(assignable: Assignable) {
    await db.collection('assignables').add(
      {
        id: assignable.id,
        name: assignable.name,
        tasksIds: assignable.tasksIds,
      },
      assignable.id,
    )
  }

  async list() {
    const assignables = await db.collection('assignables').get()
    return assignables as Assignable[]
  }

  async findById(id: string) {
    const assignable = await db.collection('assignables').doc(id).get()
    return assignable as Assignable
  }

  async delete(assignable: Assignable) {
    await db.collection('assignables').doc(assignable.id).delete()
  }

  async save(assignable: Assignable) {
    await db.collection('assignables').doc(assignable.id).update({
      id: assignable.id,
      name: assignable.name,
      tasksIds: assignable.tasksIds,
    })
  }

  async listByTask(taskId: string): Promise<Assignable[]> {
    const allAssignable = await this.list()
    const assignablesForThatTask = allAssignable.filter((assignable) =>
      assignable.tasksIds.includes(taskId),
    )

    return assignablesForThatTask
  }
}
