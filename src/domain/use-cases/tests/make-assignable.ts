import { Assignable } from '@/domain/entities/Assignable'
import { createUUID } from '@/util/create-uuid'
import { faker } from '@faker-js/faker'

type Prop = null | string[]

export function makeAssignable(taskIds: Prop = null) {
  return Assignable.create({
    name: faker.lorem.word(),
    tasksIds: taskIds || [
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
    ],
  })
}
