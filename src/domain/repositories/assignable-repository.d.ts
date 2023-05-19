import { Assignable } from '../entities/Assignable'

export interface AssignableRepository {
  create(props: Assignable): Promise<void>
  list(): Promise<Assignable[]>
  findById(id: string): Promise<Assignable | null>
  delete(assignable: Assignable): Promise<void>
  save(assignable: Assignable): Promise<void>
}
