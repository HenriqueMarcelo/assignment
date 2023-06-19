import { Assignment } from '@/domain/entities/Assignment'
import { AssignmentRepository } from '@/domain/repositories/assignment-repository'
import { db } from '@/libs/local-base'

export class LocalBaseAssignmentRepository implements AssignmentRepository {
  items: Assignment[] = []

  async create(assignment: Assignment) {
    await db.collection('assignments').add(
      {
        id: assignment.id,
        taskId: assignment.taskId,
        assignableId: assignment.assignableId,
        date: assignment.date,
      },
      assignment.id,
    )
  }

  async list() {
    const assignments = await db.collection('assignments').get()
    return assignments
  }

  async findById(id: string) {
    const assignment = await db.collection('assignments').doc(id).get()
    return assignment
  }

  async delete(assignment: Assignment) {
    await db.collection('assignments').doc(assignment.id).delete()
  }

  async save(assignment: Assignment) {
    await db.collection('assignments').doc(assignment.id).update({
      id: assignment.id,
      taskId: assignment.taskId,
      assignableId: assignment.assignableId,
      date: assignment.date,
    })
  }
}
