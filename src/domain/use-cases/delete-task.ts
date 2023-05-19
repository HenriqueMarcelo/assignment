import { TaskRepository } from '../repositories/task-repository'

interface DeleteTaskUseCaseRequest {
  taskId: string
}

interface DeleteTaskUseCaseResponse {}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    taskId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new Error('Task not found.')
    }

    await this.taskRepository.delete(task)

    return {}
  }
}
