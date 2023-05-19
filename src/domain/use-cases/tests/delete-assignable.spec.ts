import { beforeEach, expect, it } from 'vitest'
import { DeleteAssignableUseCase } from '../delete-assignable'
import { InMemoryAssignableRepository } from './in-memory-assignable-repository'
import { makeAssignable } from './make-assignable'

let inMemoryAssignableRepository: InMemoryAssignableRepository
let sut: DeleteAssignableUseCase

beforeEach(() => {
  inMemoryAssignableRepository = new InMemoryAssignableRepository()
  sut = new DeleteAssignableUseCase(inMemoryAssignableRepository)
})

it('should be able to delete a assignable', async () => {
  const assignable = makeAssignable()
  await inMemoryAssignableRepository.create(assignable)

  await sut.execute({
    assignableId: assignable.id,
  })

  expect(inMemoryAssignableRepository.items).toHaveLength(0)
})
