import { beforeEach, expect, it } from 'vitest'
import { InMemoryAssignableRepository } from './in-memory-assignable-repository'
import { GetNextAssignableByTaskUseCase } from '../get-next-assignable-by-task'
import { InMemoryTaskRepository } from './in-memory-task-repository'
import { InMemoryAssignmentRepository } from './in-memory-assignment-repository'

import { Assignment } from '@/domain/entities/Assignment'
import { makeTask } from './make-task'
import { makeAssignable } from './make-assignable'

let inMemoryTaskRepository: InMemoryTaskRepository
let inMemoryAssignableRepository: InMemoryAssignableRepository
let inMemoryAssignmentRepository: InMemoryAssignmentRepository
let sut: GetNextAssignableByTaskUseCase

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository()
  inMemoryAssignableRepository = new InMemoryAssignableRepository()
  inMemoryAssignmentRepository = new InMemoryAssignmentRepository()
  sut = new GetNextAssignableByTaskUseCase(
    inMemoryTaskRepository,
    inMemoryAssignableRepository,
    inMemoryAssignmentRepository,
  )
})

async function createScenery(createAssignments = true) {
  const task1 = makeTask()
  const task2 = makeTask()
  const task3 = makeTask()

  await inMemoryTaskRepository.create(task1)
  await inMemoryTaskRepository.create(task2)
  await inMemoryTaskRepository.create(task3)

  const assignable1 = makeAssignable([task1.id])
  const assignable2 = makeAssignable([task1.id, task2.id])
  const assignable3 = makeAssignable([task1.id, task2.id, task3.id])

  await inMemoryAssignableRepository.create(assignable1)
  await inMemoryAssignableRepository.create(assignable2)
  await inMemoryAssignableRepository.create(assignable3)

  if (createAssignments) {
    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 1),
        assignableId: assignable1.id,
        taskId: task1.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 2),
        assignableId: assignable1.id,
        taskId: task1.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 6),
        assignableId: assignable1.id,
        taskId: task1.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 1),
        assignableId: assignable2.id,
        taskId: task1.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 2),
        assignableId: assignable2.id,
        taskId: task2.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 3),
        assignableId: assignable2.id,
        taskId: task1.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 2),
        assignableId: assignable3.id,
        taskId: task1.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 3),
        assignableId: assignable3.id,
        taskId: task2.id,
      }),
    )

    await inMemoryAssignmentRepository.create(
      Assignment.create({
        date: new Date(2000, 0, 4),
        assignableId: assignable3.id,
        taskId: task2.id,
      }),
    )
  }

  return {
    task1,
    task2,
    task3,
    assignable1,
    assignable2,
    assignable3,
  }
}

it('should get the only person able to the task', async () => {
  const { task3, assignable3 } = await createScenery()

  const { assignableIds } = await sut.execute({
    taskId: task3.id,
    usersNotRequested: [],
  })

  expect(assignableIds).toStrictEqual([assignable3.id])
})

it('should get only 2 persons when the task can be only 2 persons', async () => {
  const { task2 } = await createScenery()

  const { assignableIds } = await sut.execute({
    taskId: task2.id,
    usersNotRequested: [],
  })

  expect(assignableIds).toHaveLength(2)
})

it('should get the most idle person', async () => {
  const { task1, assignable1, assignable2, assignable3 } = await createScenery()

  const { assignableIds } = await sut.execute({
    taskId: task1.id,
    usersNotRequested: [],
  })

  expect(assignableIds).toStrictEqual([
    assignable2.id,
    assignable3.id,
    assignable1.id,
  ])
})

it('should put some person in the end of the array if not requested', async () => {
  const { task1, assignable1, assignable2, assignable3 } = await createScenery()

  const { assignableIds } = await sut.execute({
    taskId: task1.id,
    usersNotRequested: [assignable2.id],
  })

  expect(assignableIds).toStrictEqual([
    assignable3.id,
    assignable1.id,
    assignable2.id,
  ])
})

it.only('should consider person as idle when there is no register', async () => {
  const { task1, assignable1 } = await createScenery(false)

  const { assignableIds } = await sut.execute({
    taskId: task1.id,
    usersNotRequested: [],
  })

  expect(assignableIds).toContain(assignable1.id)
})

it.only('should not crash when the not requested user has no history', async () => {
  const { task1, assignable1, assignable2 } = await createScenery(false)

  const { assignableIds } = await sut.execute({
    taskId: task1.id,
    usersNotRequested: [assignable2.id],
  })

  expect(assignableIds).toContain(assignable1.id)
})
