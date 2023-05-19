import { Assignment } from '../entities/Assignment'
import { AssignmentRepository } from '../repositories/assignment-repository'

interface CreateAssignmentUseCaseRequest {
  assignableId: string
  taskId: string
  date: Date
}

interface CreateAssignmentUseCaseResponse {
  assignment: Assignment
}

export class CreateAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute({
    assignableId,
    taskId,
    date,
  }: CreateAssignmentUseCaseRequest): Promise<CreateAssignmentUseCaseResponse> {
    const assignment = Assignment.create({
      assignableId,
      taskId,
      date,
    })

    await this.assignmentRepository.create(assignment)

    return { assignment }
  }
}
