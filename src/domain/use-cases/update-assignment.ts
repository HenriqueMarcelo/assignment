import { Assignment } from '../entities/Assignment'
import { AssignmentRepository } from '../repositories/assignment-repository'

interface UpdateAssignmentUseCaseRequest {
  assignmentId: string
  date: Date
}

interface UpdateAssignmentUseCaseResponse {
  assignment: Assignment
}

export class UpdateAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute({
    date,
    assignmentId,
  }: UpdateAssignmentUseCaseRequest): Promise<UpdateAssignmentUseCaseResponse> {
    const assignment = await this.assignmentRepository.findById(assignmentId)

    if (!assignment) {
      throw new Error('Assignment not found.')
    }

    assignment.date = date

    await this.assignmentRepository.save(assignment)

    return { assignment }
  }
}
