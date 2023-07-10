'use client'

import { useUseCases } from '@/hooks/use-cases'
import { useCallback, useEffect, useState } from 'react'

export default function Any() {
  const [inputValueNew, setInputValueNew] = useState('')
  const [inputValueEdit, setInputValueEdit] = useState('')
  const [tasks, setTasks] = useState<any>([])
  const [taskEditing, setTaskEditing] = useState<null | string>(null)

  const {
    listTaskUseCase,
    createTaskUseCase,
    deleteTaskUseCase,
    updateTaskUseCase,
  } = useUseCases()

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
        <table className="w-full text-sm text-left text-gray-950 ">
          <thead className="text-xs text-gray-950 uppercase bg-orange-200">
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
            {tasks.map((task: any) => {
              const isEditing = taskEditing === task.id
              return (
                <tr className="bg-white border-b " key={task.id}>
                  <td className="px-6 py-4">
                    <input
                      value={isEditing ? inputValueEdit : task.name}
                      className={`px-4 py-2 w-64 border ${
                        isEditing
                          ? 'border-gray-500'
                          : 'border-transparent bg-white'
                      }`}
                      onChange={(e) => setInputValueEdit(e.target.value)}
                      disabled={!isEditing}
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    {isEditing ? (
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
                    {isEditing ? (
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
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
