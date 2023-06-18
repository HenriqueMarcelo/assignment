'use client'

import { CreateTaskUseCase } from '@/domain/use-cases/create-task'
import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task'
import { ListTaskUseCase } from '@/domain/use-cases/list-task'
import { UpdateTaskUseCase } from '@/domain/use-cases/update-task'
import { LocalBaseTaskRepository } from '@/implementation/repositories/local-base-task-repository'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function Any() {
  const [inputValueNew, setInputValueNew] = useState('')
  const [inputValueEdit, setInputValueEdit] = useState('')
  const [tasks, setTasks] = useState<any>([])
  const [taskEditing, setTaskEditing] = useState<null | string>(null)

  const listTaskUseCase = useMemo(() => {
    const localBaseTaskRepository = new LocalBaseTaskRepository()
    return new ListTaskUseCase(localBaseTaskRepository)
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

  async function handleSave() {
    await createTaskUseCase.execute({
      name: inputValueNew,
    })
    setInputValueNew('')
    updateTasksList()
  }

  async function handleDelete(taskId: string) {
    await deleteTaskUseCase.execute({
      taskId,
    })

    updateTasksList()
  }

  async function handleUpdate(name: string) {
    await updateTaskUseCase.execute({
      name: inputValueEdit,
      taskId: taskEditing!,
    })
    setTaskEditing(null)
    updateTasksList()
  }

  const updateTasksList = useCallback(async () => {
    const { tasks: tasksFromDB } = await listTaskUseCase.execute()
    setTasks(tasksFromDB)
  }, [listTaskUseCase])

  useEffect(() => {
    updateTasksList()
  }, [updateTasksList])

  return (
    <main className="col-span-4 my-16">
      <h2 className="text-4xl	font-bold mb-8">Nova Tarefa</h2>
      <form action="" className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <label htmlFor="">Nome:</label>
          <input
            value={inputValueNew}
            type="text"
            className="px-4 py-2 shadow-md"
            onChange={(e) => setInputValueNew(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-green-300 px-4 py-2 shadow-md rounded-lg"
            onClick={handleSave}
            type="button"
          >
            Salvar
          </button>
        </div>
      </form>

      <h2 className="text-4xl	font-bold mb-8 mt-16">Tarefas</h2>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-6 py-4">
                  {taskEditing === task.id ? (
                    <input
                      value={inputValueEdit}
                      className="px-4 py-2 w-64 border border-gray-500"
                      onChange={(e) => setInputValueEdit(e.target.value)}
                    />
                  ) : (
                    <input
                      className="px-4 py-2 w-64 border border-transparent bg-white"
                      value={task.name}
                      disabled
                    />
                  )}
                </td>
                <td className="px-6 py-4 flex gap-4">
                  {taskEditing === task.id ? (
                    <button
                      className="bg-orange-300 px-4 py-2 w-24"
                      onClick={() => handleUpdate(inputValueEdit)}
                    >
                      salvar
                    </button>
                  ) : (
                    <button
                      className="bg-blue-300 px-4 py-2 w-24"
                      onClick={() => {
                        setTaskEditing(task.id)
                        setInputValueEdit(task.name)
                      }}
                    >
                      editar
                    </button>
                  )}
                  {taskEditing === task.id ? (
                    <button
                      className="bg-stone-300 px-4 py-2 w-24"
                      onClick={() => setTaskEditing(null)}
                    >
                      cancelar
                    </button>
                  ) : (
                    <button
                      className="bg-red-300 px-4 py-2 w-24"
                      onClick={() => handleDelete(task.id)}
                    >
                      deletar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
