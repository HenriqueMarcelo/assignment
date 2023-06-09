import { Assignment } from '../entities/Assignment'

export interface AssignmentRepository {
  create(props: Assignment): Promise<void>
  list(): Promise<Assignment[]>
  findById(id: string): Promise<Assignment | null>
  delete(assignment: Assignment): Promise<void>
  save(assignment: Assignment): Promise<void>

  getLastAssignmentOfAssignable(assignableId: string): Promise<Assignment>
  getLastAssignmentByAssignableAndTask(
    assignableId: string,
    taskId: string,
  ): Promise<Assignment>
}
