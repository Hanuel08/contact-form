import { IconTrash } from "@tabler/icons-react"

export function DeleteBtn({ id, deleteData }) {
  return (
    <button onClick={() => deleteData({ id })} className="bg-red-500 rounded-sm text-white p-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-red-600">
      <IconTrash stroke={2} />
    </button>
  )
}