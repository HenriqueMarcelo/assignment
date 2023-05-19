import { Assignable } from '../../entities/Assignable'
import { AssignableRepository } from '../../repositories/assignable-repository'

export class InMemoryAssignableRepository implements AssignableRepository {
  items: Assignable[] = []

  async create(assignable: Assignable) {
    this.items.push(assignable)
  }

  async list() {
    return this.items
  }

  async findById(id: string) {
    const assignable = this.items.find((item) => item.id.toString() === id)

    if (!assignable) {
      return null
    }

    return assignable
  }

  async delete(assignable: Assignable) {
    const itemIndex = this.items.findIndex((item) => item.id === assignable.id)
    this.items.splice(itemIndex, 1)
  }

  async save(assignable: Assignable) {
    const itemIndex = this.items.findIndex((item) => item.id === assignable.id)

    this.items[itemIndex] = assignable
  }
}
