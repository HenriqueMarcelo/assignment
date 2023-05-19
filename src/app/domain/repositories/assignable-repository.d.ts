import { Assignable } from '../entities/Assignable'

export interface AssignableRepository {
  create(props: Assignable): Promise<void>
}
