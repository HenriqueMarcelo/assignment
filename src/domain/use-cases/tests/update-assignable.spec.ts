import { beforeEach, expect, it } from 'vitest'
import { UpdateAssignableUseCase } from '../update-assignable'
import { InMemoryAssignableRepository } from './in-memory-assignable-repository'
import { makeAssignable } from './make-assignable'
import { createUUID } from '@/util/create-uuid'

let inMemoryAssignableRepository: InMemoryAssignableRepository
let sut: UpdateAssignableUseCase

beforeEach(() => {
  inMemoryAssignableRepository = new InMemoryAssignableRepository()
  sut = new UpdateAssignableUseCase(inMemoryAssignableRepository)
})

it('should be able to update a assignable', async () => {
  const assignable = makeAssignable()
  await inMemoryAssignableRepository.create(assignable)

  await sut.execute({
    assignableId: assignable.id,
    name: 'new-name',
    tasksIds: [createUUID(), createUUID(), createUUID()],
  })

  expect(inMemoryAssignableRepository.items[0].name).toEqual('new-name')
})
