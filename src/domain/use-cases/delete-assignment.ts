import { AssignmentRepository } from '../repositories/assignment-repository'

interface DeleteAssignmentUseCaseRequest {
  assignmentId: string
}

interface DeleteAssignmentUseCaseResponse {}

export class DeleteAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute({
    assignmentId,
  }: DeleteAssignmentUseCaseRequest): Promise<DeleteAssignmentUseCaseResponse> {
    const assignment = await this.assignmentRepository.findById(assignmentId)

    if (!assignment) {
      throw new Error('Assignment not found.')
    }

    await this.assignmentRepository.delete(assignment)

    return {}
  }
}
