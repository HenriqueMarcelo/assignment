import { Task } from '../entities/Task'
import { TaskRepository } from '../repositories/task-repository'

interface UpdateTaskUseCaseRequest {
  taskId: string
  name: string
}

interface UpdateTaskUseCaseResponse {
  task: Task
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    name,
    taskId,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new Error('Task not found.')
    }

    task.name = name

    await this.taskRepository.save(task)

    return { task }
  }
}
