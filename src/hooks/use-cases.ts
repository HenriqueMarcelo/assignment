import { CreateAssignableUseCase } from '@/domain/use-cases/create-assignable'
import { CreateAssignmentUseCase } from '@/domain/use-cases/create-assignment'
import { CreateTaskUseCase } from '@/domain/use-cases/create-task'
import { DeleteAssignableUseCase } from '@/domain/use-cases/delete-assignable'
import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task'
import { ListAssignableUseCase } from '@/domain/use-cases/list-assignable'
import { ListTaskUseCase } from '@/domain/use-cases/list-task'
import { UpdateAssignableUseCase } from '@/domain/use-cases/update-assignable'
import { UpdateTaskUseCase } from '@/domain/use-cases/update-task'
import { LocalBaseAssignableRepository } from '@/implementation/repositories/local-base-assignable-repository'
import { LocalBaseAssignmentRepository } from '@/implementation/repositories/local-base-assignment-repository'
import { LocalBaseTaskRepository } from '@/implementation/repositories/local-base-task-repository'
import { useMemo } from 'react'

export function useUseCases() {
  const listTaskUseCase = useMemo(() => {
    const localBaseTaskRepository = new LocalBaseTaskRepository()
    return new ListTaskUseCase(localBaseTaskRepository)
  }, [])

  const listAssignableUseCase = useMemo(() => {
    const localBaseAssignableRepository = new LocalBaseAssignableRepository()
    return new ListAssignableUseCase(localBaseAssignableRepository)
  }, [])

  const createAssignableUseCase = useMemo(() => {
    const localBaseAssignableRepository = new LocalBaseAssignableRepository()
    return new CreateAssignableUseCase(localBaseAssignableRepository)
  }, [])

  const deleteAssignableUseCase = useMemo(() => {
    const localBaseAssignableRepository = new LocalBaseAssignableRepository()
    return new DeleteAssignableUseCase(localBaseAssignableRepository)
  }, [])

  const updateAssignableUseCase = useMemo(() => {
    const localBaseAssignableRepository = new LocalBaseAssignableRepository()
    return new UpdateAssignableUseCase(localBaseAssignableRepository)
  }, [])

  const createTaskUseCase = useMemo(() => {
    const localBaseTaskRepository = new LocalBaseTaskRepository()
    return new CreateTaskUseCase(localBaseTaskRepository)
  }, [])

  const deleteTaskUseCase = useMemo(() => {
    const localBaseTaskRepository = new LocalBaseTaskRepository()
    return new DeleteTaskUseCase(localBaseTaskRepository)
  }, [])

  const updateTaskUseCase = useMemo(() => {
    const localBaseTaskRepository = new LocalBaseTaskRepository()
    return new UpdateTaskUseCase(localBaseTaskRepository)
  }, [])

  const createAssignmentUseCase = useMemo(() => {
    const localBaseAssignmentRepository = new LocalBaseAssignmentRepository()
    return new CreateAssignmentUseCase(localBaseAssignmentRepository)
  }, [])

  return {
    listTaskUseCase,
    listAssignableUseCase,
    createAssignableUseCase,
    deleteAssignableUseCase,
    updateAssignableUseCase,
    createTaskUseCase,
    deleteTaskUseCase,
    updateTaskUseCase,
    createAssignmentUseCase,
  }
}
