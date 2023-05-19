import { beforeAll, expect, it } from 'vitest'
import { CreateAssignableUseCase } from '../create-assignable'
import { InMemoryAssignableRepository } from './in-memory-assignable-repository'

let inMemoryAssignableRepository: InMemoryAssignableRepository
let sut: CreateAssignableUseCase

beforeAll(() => {
  inMemoryAssignableRepository = new InMemoryAssignableRepository()
  sut = new CreateAssignableUseCase(inMemoryAssignableRepository)
})

it('should be able to create a assignable', () => {
  sut.execute({
    name: 'John Doe',
    tasksIds: ['task-1', 'task-2'],
  })

  expect(inMemoryAssignableRepository.items[0].name).toEqual('John Doe')
})
