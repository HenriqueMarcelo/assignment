import { Assignment } from '@/domain/entities/Assignment'
import { AssignmentRepository } from '@/domain/repositories/assignment-repository'
import { db } from '@/libs/local-base'

export class LocalBaseAssignmentRepository implements AssignmentRepository {
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
    return assignments as Assignment[]
  }

  async findById(id: string) {
    const assignment = await db.collection('assignments').doc(id).get()
    return assignment as Assignment
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

  async getLastAssignmentOfAssignable(assignableId: string) {
    const allAssignments = await this.list()
    const allAssignmenetOfAssignable = allAssignments.filter(
      (assignment) => assignment.assignableId === assignableId,
    )

    allAssignmenetOfAssignable.sort((a, b) => {
      return a.date.getTime() - b.date.getTime()
    })

    if (allAssignmenetOfAssignable.slice(-1)[0]) {
      return allAssignmenetOfAssignable.slice(-1)[0]
    }

    return Assignment.create({
      assignableId,
      date: null as unknown as Date,
      taskId: '',
    })
  }
}
