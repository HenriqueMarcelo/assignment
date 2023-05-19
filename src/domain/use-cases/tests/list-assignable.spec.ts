import { beforeEach, expect, it } from 'vitest'
import { ListAssignableUseCase } from '../list-assignable'
import { InMemoryAssignableRepository } from './in-memory-assignable-repository'
import { makeAssignable } from './make-assignable'

let inMemoryAssignableRepository: InMemoryAssignableRepository
let sut: ListAssignableUseCase

beforeEach(() => {
  inMemoryAssignableRepository = new InMemoryAssignableRepository()
  sut = new ListAssignableUseCase(inMemoryAssignableRepository)
})

it('should be able to list a assignable', async () => {
  inMemoryAssignableRepository.create(makeAssignable())
  inMemoryAssignableRepository.create(makeAssignable())
  inMemoryAssignableRepository.create(makeAssignable())

  const { assignables } = await sut.execute()

  expect(assignables).toHaveLength(3)
})
