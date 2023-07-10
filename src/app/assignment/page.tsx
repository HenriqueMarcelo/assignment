'use client'

import { Assignable } from '@/domain/entities/Assignable'
import { Task } from '@/domain/entities/Task'
import { useUseCases } from '@/hooks/use-cases'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import { newDateFromString } from '@/util/new-date-from-string'

export default function Any() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [assignables, setAssignables] = useState<Assignable[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const { control, register, handleSubmit, watch } = useForm()
  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'assignables', // unique name for your Field Array
  })

  const { listAssignableUseCase, listTaskUseCase, createAssignmentUseCase } =
    useUseCases()

  async function generateAutoAssignment() {}

  function handleSetDate(dateString: string) {
    const dateSelected = newDateFromString(dateString)
    setSelectedDate(dateSelected)
  }

  async function handleSave(data: FieldValues) {
    for (const line of data.assignables) {
      const keys = Object.keys(line)
      const taskId = keys[0]

      const assignableId = line[taskId]

      await createAssignmentUseCase.execute({
        date: new Date(data.date),
        assignableId,
        taskId,
      })
    }
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

  function assignablesByTaskId(taskId: string) {
    return assignables.filter((a) => {
      return a.tasksIds.includes(taskId)
    })
  }

  return (
    <main className="col-span-4 my-16">
      <h2 className="text-4xl	font-bold mb-8">Tabela de designação:</h2>
      <form
        action=""
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="">Data:</label>
          <input
            type="date"
            className="px-4 py-2 shadow-md"
            required
            {...register('date', {
              onChange: (e) => handleSetDate(e.target.value),
              valueAsDate: true,
            })}
          />
          <label htmlFor="">Tarefas:</label>
          <table className="w-full text-sm text-left text-gray-950  ">
            <thead className="text-xs text-gray-950 uppercase bg-orange-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tarefa
                </th>
                <th scope="col" className="px-6 py-3">
                  Designável
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: Task, index) => (
                <tr className="bg-white border-b " key={task.id}>
                  <td className="px-6 py-4">{task.name}</td>
                  <td className="px-6 py-4">
                    <select
                      className="w-full p-4 shadow-md"
                      {...register(`assignables.${index}.${task.id}`)}
                    >
                      <option></option>
                      {assignablesByTaskId(task.id).map((assignable) => (
                        <option
                          className="w-full p-4 shadow-md"
                          value={assignable.id}
                          key={assignable.id}
                        >
                          {assignable.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-300 px-4 py-2 w-24">
                      outro
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button className="bg-green-300 px-4 py-2 shadow-md rounded-lg hover:bg-green-500">
            Salvar
          </button>
        </div>
      </form>
    </main>
  )
}
