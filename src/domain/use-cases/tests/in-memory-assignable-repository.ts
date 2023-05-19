import { Assignable } from '../../entities/Assignable'
import { AssignableRepository } from '../../repositories/assignable-repository'

export class InMemoryAssignableRepository implements AssignableRepository {
  items: Assignable[] = []

  async create(assignable: Assignable) {
    this.items.push(assignable)
  }
}
