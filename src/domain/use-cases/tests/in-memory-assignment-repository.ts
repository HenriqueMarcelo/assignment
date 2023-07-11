import { Assignment } from '../../entities/Assignment'
import { AssignmentRepository } from '../../repositories/assignment-repository'

export class InMemoryAssignmentRepository implements AssignmentRepository {
  items: Assignment[] = []

  async create(assignment: Assignment) {
    this.items.push(assignment)
  }

  async list() {
    return this.items
  }

  async findById(id: string) {
    const assignment = this.items.find((item) => item.id.toString() === id)

    if (!assignment) {
      return null
    }

    return assignment
  }

  async delete(assignment: Assignment) {
    const itemIndex = this.items.findIndex((item) => item.id === assignment.id)
    this.items.splice(itemIndex, 1)
  }

  async save(assignment: Assignment) {
    const itemIndex = this.items.findIndex((item) => item.id === assignment.id)

    this.items[itemIndex] = assignment
  }

  async getLastAssignmentOfAssignable(assignableId: string) {
    const allAssignmenetOfAssignable = this.items.filter(
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

  async getLastAssignmentByAssignableAndTask(
    assignableId: string,
    taskId: string,
  ) {
    const allAssignmenetOfAssignable = this.items.filter(
      (assignment) =>
        assignment.assignableId === assignableId &&
        assignment.taskId === taskId,
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
      taskId,
    })
  }
}
