import { Assignment } from '../entities/Assignment'

export interface AssignmentRepository {
  create(props: Assignment): Promise<void>
  list(): Promise<Assignment[]>
  findById(id: string): Promise<Assignment | null>
  delete(assignment: Assignment): Promise<void>
  save(assignment: Assignment): Promise<void>
}
