import { Assignment } from '../entities/Assignment'

export interface AssignmentRepository {
  create(props: Assignment): Promise<void>
}
