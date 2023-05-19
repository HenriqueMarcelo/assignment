import { beforeEach, expect, it } from 'vitest'
import { UpdateTaskUseCase } from '../update-task'
import { InMemoryTaskRepository } from './in-memory-task-repository'
import { makeTask } from './make-task'

let inMemoryTaskRepository: InMemoryTaskRepository
let sut: UpdateTaskUseCase

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository()
  sut = new UpdateTaskUseCase(inMemoryTaskRepository)
})

it('should be able to update a task', async () => {
  const task = makeTask()
  await inMemoryTaskRepository.create(task)

  await sut.execute({
    taskId: task.id,
    name: 'new-name',
  })

  expect(inMemoryTaskRepository.items[0].name).toEqual('new-name')
})
