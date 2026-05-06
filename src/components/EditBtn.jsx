import { IconEditFilled } from "@tabler/icons-react"

export function EditBtn({ id, data, setForm, setEditFormData }) {
  const handleEdit = () => {
    setEditFormData({ id, editing: true })
    setForm(data.find(item => item.id === id))
  } 

  return (
    <button onClick={() => handleEdit()} className="bg-green-500 rounded-sm text-white p-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-green-600">
      <IconEditFilled stroke={2} />
    </button>
  )
}