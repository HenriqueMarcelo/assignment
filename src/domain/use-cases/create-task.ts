import { Task } from '../entities/Task'
import { TaskRepository } from '../repositories/task-repository'

interface CreateTaskUseCaseRequest {
  name: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    name,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = Task.create({
      name,
    })

    await this.taskRepository.create(task)

    return { task }
  }
}
