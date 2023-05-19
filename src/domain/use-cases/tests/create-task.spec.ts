import { beforeAll, expect, it } from 'vitest'
import { CreateTaskUseCase } from '../create-task'
import { InMemoryTaskRepository } from './in-memory-task-repository'

let inMemoryTaskRepository: InMemoryTaskRepository
let sut: CreateTaskUseCase

beforeAll(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository()
  sut = new CreateTaskUseCase(inMemoryTaskRepository)
})

it('should be able to create a task', () => {
  sut.execute({
    name: 'John Doe',
  })

  expect(inMemoryTaskRepository.items[0].name).toEqual('John Doe')
})
