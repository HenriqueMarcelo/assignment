'use client'

import { Assignable } from '@/domain/entities/Assignable'
import { Task } from '@/domain/entities/Task'
import { useUseCases } from '@/hooks/use-cases'
import { useCallback, useEffect, useState } from 'react'

export default function Any() {
  const [inputValueNew, setInputValueNew] = useState('')
  const [inputSelectNew, setInputSelectNew] = useState<string[]>([])
  const [inputSelectEdit, setInputSelectEdit] = useState<string[]>([])
  const [inputValueEdit, setInputValueEdit] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [assignables, setAssignables] = useState<Assignable[]>([])
  const [assignableEditing, setAssignableEditing] = useState<null | string>(
    null,
  )

  const {
    listTaskUseCase,
    listAssignableUseCase,
    createAssignableUseCase,
    deleteAssignableUseCase,
    updateAssignableUseCase,
  } = useUseCases()

  async function handleSave() {
    await createAssignableUseCase.execute({
      name: inputValueNew,
      tasksIds: inputSelectNew,
    })
    setInputValueNew('')
    setInputSelectNew([])
    updateAssignableList()
  }

  async function handleDelete(assignableId: string) {
    await deleteAssignableUseCase.execute({
      assignableId,
    })

    updateAssignableList()
  }

  async function handleUpdate(name: string, inputTasksIds: string[]) {
    await updateAssignableUseCase.execute({
      name: inputValueEdit,
      tasksIds: inputTasksIds,
      assignableId: assignableEditing!,
    })
    setAssignableEditing(null)
    updateAssignableList()
  }

  const updateTasksList = useCallback(async () => {
    const { tasks: tasksFromDB } = await listTaskUseCase.execute()
    setTasks(tasksFromDB)
  }, [listTaskUseCase])

  const updateAssignableList = useCallback(async () => {
    const { assignables: assignableFromDB } =
      await listAssignableUseCase.execute()
    setAssignables(assignableFromDB)
  }, [listAssignableUseCase])

  useEffect(() => {
    updateTasksList()
    updateAssignableList()
  }, [updateAssignableList, updateTasksList])

  return (
    <main className="col-span-4 my-16">
      <h2 className="text-4xl	font-bold mb-8">Novo Designável</h2>
      <form action="" className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <label htmlFor="">Nome:</label>
          <input
            value={inputValueNew}
            type="text"
            className="px-4 py-2 shadow-md"
            onChange={(e) => setInputValueNew(e.target.value)}
          />
          <label htmlFor="">Tarefas:</label>
          <select
            multiple
            className="w-full p-4 shadow-md"
            size={10}
            value={inputSelectNew}
            onChange={(e) => {
              const value = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              )
              setInputSelectNew(value)
            }}
          >
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="bg-green-300 px-4 py-2 shadow-md rounded-lg hover:bg-green-500"
            onClick={handleSave}
            type="button"
          >
            Salvar
          </button>
        </div>
      </form>

      <h2 className="text-4xl	font-bold mb-8 mt-16">Designáveis</h2>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Tasks
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {assignables.map((assignable: Assignable) => {
              const isEditing = assignableEditing === assignable.id
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={assignable.id}
                >
                  <td className="px-6 py-4">
                    <input
                      value={isEditing ? inputValueEdit : assignable.name}
                      className={`px-4 py-2 w-64 border ${
                        isEditing
                          ? 'border-gray-500'
                          : 'border-transparent bg-white'
                      }`}
                      onChange={(e) => setInputValueEdit(e.target.value)}
                      disabled={!isEditing}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      disabled={assignableEditing !== assignable.id}
                      multiple
                      className="w-full p-4 shadow-md"
                      size={5}
                      value={
                        assignableEditing !== assignable.id
                          ? assignable.tasksIds
                          : inputSelectEdit
                      }
                      onChange={(e) => {
                        const value = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        )
                        setInputSelectEdit(value)
                      }}
                    >
                      {tasks.map((task) => (
                        <option key={task.id} value={task.id}>
                          {task.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    {isEditing ? (
                      <button
                        className="bg-orange-300 px-4 py-2 w-24"
                        onClick={() =>
                          handleUpdate(inputValueEdit, inputSelectEdit)
                        }
                      >
                        salvar
                      </button>
                    ) : (
                      <button
                        className="bg-blue-300 px-4 py-2 w-24"
                        onClick={() => {
                          setAssignableEditing(assignable.id)
                          setInputValueEdit(assignable.name)
                          setInputSelectEdit(assignable.tasksIds)
                        }}
                      >
                        editar
                      </button>
                    )}
                    {isEditing ? (
                      <button
                        className="bg-stone-300 px-4 py-2 w-24"
                        onClick={() => setAssignableEditing(null)}
                      >
                        cancelar
                      </button>
                    ) : (
                      <button
                        className="bg-red-300 px-4 py-2 w-24"
                        onClick={() => handleDelete(assignable.id)}
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
