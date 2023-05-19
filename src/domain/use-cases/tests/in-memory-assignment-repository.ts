import { Assignment } from '../../entities/Assignment'
import { AssignmentRepository } from '../../repositories/assignment-repository'

export class InMemoryAssignmentRepository implements AssignmentRepository {
  items: Assignment[] = []

  async create(assignment: Assignment) {
    this.items.push(assignment)
  }
}
