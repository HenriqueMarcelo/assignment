'use client'

import { CreateTaskUseCase } from '@/domain/use-cases/create-task'
import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task'
import { ListTaskUseCase } from '@/domain/use-cases/list-task'
import { UpdateTaskUseCase } from '@/domain/use-cases/update-task'
import { LocalBaseTaskRepository } from '@/implementation/repositories/local-base-task-repository'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [users, setUsers] = useState<any>([])
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
      name: inputValue,
    })
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
      name: 'new name',
      taskId: taskEditing!,
    })
    setTaskEditing(null)
    updateTasksList()
  }

  const updateTasksList = useCallback(async () => {
    const { tasks: tasksFromDB } = await listTaskUseCase.execute()
    setUsers(tasksFromDB)
  }, [listTaskUseCase])

  useEffect(() => {
    updateTasksList()
  }, [updateTasksList])

  return (
    <section className="container mx-auto grid grid-cols-5 gap-16 my-16">
      <aside className="col-span-1">
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
        </ul>
      </aside>
      <main className="col-span-4">
        <h2 className="text-4xl	font-bold mb-8">Nova Tarefa</h2>
        <form action="" className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="">Nome:</label>
            <input
              value={inputValue}
              type="text"
              className="px-4 py-2"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-green-300 px-4 py-2"
              onClick={handleSave}
              type="button"
            >
              Salvar
            </button>
          </div>
        </form>

        <h2 className="text-4xl	font-bold mb-8 mt-16">Tarefas</h2>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              {users.map((task: any) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={task.id}
                >
                  <td className="px-6 py-4">
                    {taskEditing === task.id ? (
                      <input
                        value={inputValue}
                        type="text"
                        className="px-4 py-2 w-64 border"
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    ) : (
                      <div className="w-64">{task.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    {taskEditing === task.id ? (
                      <button
                        className="bg-orange-300 px-4 py-2 w-24"
                        onClick={() => handleUpdate(inputValue)}
                      >
                        editar
                      </button>
                    ) : (
                      <button
                        className="bg-blue-300 px-4 py-2 w-24"
                        onClick={() => {
                          setTaskEditing(task.id)
                          setInputValue(task.name)
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
    </section>
  )
}
