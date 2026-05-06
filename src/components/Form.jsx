import { useState } from "react"

import { validateFormField } from "../utils/validateFormField.js"

export function CrudForm ({ data, setData, emptyForm, form, setForm, editData, setEditData }) {
  const [errors, setErrors] = useState({
    name: null,
    phone: null,
    email: null,
    age: null,
    department: null,
    terms: false
  })

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setForm({
      ...form, 
      [name]: value
    })

    let error = validateFormField({ [name]: value })
    if (Object.hasOwn(error, name)) {
      setErrors({
        ...errors,
        [name]: error[name]
      })
    } else {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const handleChecked = (e) =>{
    let name = e.target.name
    let value = e.target.checked

    setForm({
      ...form,
      [name]: value
    })

    let error = validateFormField({ [name]: value })
    if (Object.hasOwn(error, name)) {
      setErrors({
        ...errors,
        [name]: error[name]
      })
    } else {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault() 

    setErrors({ ...validateFormField(form) })

    if (Object.keys(errors).find(error => errors[error] !== null)) return

    if (editData.editing) {
      setEditData({ editing: false, id: null })
      setForm(emptyForm)

      setData(data.map(item => {
        if (item.id === editData.id) item = { ...item, ...form }
        return item
      }))
      return
    }

    setData([...data, { ...form, id: crypto.randomUUID() }])
    setForm(emptyForm)
    setErrors(emptyForm)
  }

  return (
    <>
      <div className="flex flex-col">
        <form className="flex flex-col items-center border-2 border-gray-200 rounded-md gap-y-8 p-6 w-xl" onSubmit={(e) => handleSubmit(e)}>

          <div className="flex flex-col gap-1">
            <label className="mr-4 text-gray-600 text-base font-bold" htmlFor="name">Name</label>
            <input 
              className="border-2 border-gray-300 text-gray-600 rounded-lg p-2 px-4 text-sm w-lg outline-none focus:border-blue-300 hover:border-blue-300" 
              type="text" name="name" id="name" placeholder="Type a name" value={form.name || ""} onChange={(e)=> handleChange(e)} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="mr-4 text-gray-600 text-base font-bold" htmlFor="phone">Phone</label>
            <input 
              className="border-2 border-gray-300 text-gray-600 rounded-lg p-2 px-4 text-sm w-lg outline-none focus:border-blue-300 hover:border-blue-300" 
              type="text" name="phone" id="phone" placeholder="Type a phone number" value={form.phone || ""} onChange={(e)=> handleChange(e)} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="mr-4 text-gray-600 text-base font-bold" htmlFor="email">Email</label>
            <input 
              className="border-2 border-gray-300 text-gray-600 rounded-lg p-2 px-4 text-sm w-lg outline-none focus:border-blue-300 hover:border-blue-300" 
              type="email" name="email" id="email" placeholder="Type a valid email" value={form.email || ""} onChange={(e)=> handleChange(e)} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="mr-4 text-gray-600 text-base font-bold" htmlFor="age">Age</label>
            <input 
              className="border-2 border-gray-300 text-gray-600 rounded-lg p-2 px-4 text-sm w-lg outline-none focus:border-blue-300 hover:border-blue-300" 
              type="number" name="age" id="age" placeholder="Type an age" value={form.age || ""} onChange={(e)=> handleChange(e)} />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="mr-4 text-gray-600 text-base font-bold" htmlFor="department">Department</label>
            {/* <input className="border-2 border-gray-300 text-gray-600 rounded-lg p-2 px-4 text-sm w-lg outline-none focus:border-blue-300 hover:border-blue-300" type="text" name="department" id="department" placeholder="Type a department" onChange={(e)=> handleChange(e)} /> */}
            <select 
              className="border-2 border-gray-300 text-gray-600 rounded-lg p-2 px-4 text-sm w-lg outline-none focus:border-blue-300 hover:border-blue-300" 
              name="department" id="department" value={form.department || ""} onChange={(e) => handleChange(e)} >

              <option className="text-gray-400 text-base" value="">Select a department</option>
              <option value="IT">IT</option>
              <option value="RRHH">RRHH</option>
              <option value="Gerencia">Gerencia</option>
              <option value="Ventas">Ventas</option>
              <option value="Marketing">Marketing</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Sistemas">Sistemas</option>
              <option value="Logística">Logística</option>
              <option value="Producción">Producción</option>
            </select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-4 text-sm text-gray-500">
              <label htmlFor="terms">Acepto los terminos y condiciones</label>
              <input className="transform scale-140" type="checkbox" id="terms" checked={form.terms || false} name="terms" onChange={(e) => handleChecked(e)} />
            </div>
            {errors.terms && <p className="text-red-500 text-sm text-center">{errors.terms}</p>}
          </div>

          {editData.editing ? (
            <input 
              type="submit" 
              value="UPDATE CONTACT" 
              className="py-2 px-4 w-full rounded-md font-bold text-sm text-white bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-300" />
          ) : (
              <input 
              type="submit" 
              value="ADD CONTACT" 
              className="py-2 px-4 w-full rounded-md font-bold text-sm text-white bg-gradient-to-r from-violet-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-violet-900 hover:to-fuchsia-700 hover:scale-102 cursor-pointer transition-all duration-300" />
          )}

        </form>
      </div>
    </>
  )
}