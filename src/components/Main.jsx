import { useState, useEffect, useMemo } from "react"
import { Form } from "./Form.jsx"
import { Table } from "./Table.jsx"
import { Header } from "./Header.jsx"
import { helpHttp } from "../helpers/helpHttp.js"
import { Loader } from "./Loader.jsx"
import { Message } from "./Message.jsx"

const emptyForm = {
  id: null,
  name: "",
  phone: "",
  email: "",
  age: null,
  department: "",
  terms: false
}

const URL = "http://localhost:5000/users"

export function Main() {
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)

  const [editFormData, setEditFormData] = useState({
    editing: false,
    id: null
  })

  const API = useMemo(() => helpHttp(), [])

  useEffect(() => {
    API.get(URL)
      .then(res => {
        if (!res.err) {
          setData(res)
          setErrors(null)
        } else {
          setData(null)
          setErrors(res)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [API])

  const editData = () => {
    const options = { body: { ...form }, headers: { "Content-Type": "application/json" } }

    API.put(`${URL}/${editFormData.id}`, options).then(res => {
      console.log(res)
      if (!res.err) {
        setData(data.map(item => item.id === editFormData.id ? { ...item, ...form } : item))
        setEditFormData({ editing: false, id: null })
        setForm(emptyForm)
      }
      else setErrors(res)
    })

    return
  }

  const createData = () => {
    const options = { body: { id: crypto.randomUUID(), ...form }, headers: { "Content-Type": "application/json" } }

    API.post(URL, options).then(res => {
      console.log(res)
      if (!res.err) {
        setData([...data, res])
        setForm(emptyForm)
      }
      else setErrors(res)
    })
  }

  const deleteData = ({ id }) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?")
    if (!confirmDelete) return
    const options = { headers: { "Content-Type": "application/json" } }

    API.del(`${URL}/${id}`, options).then(res => {
      console.log(res)
      if (!res.err) {
        setData(data.filter(item => item.id !== id))
        setErrors(null)
      }
      else setErrors(res)
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row gap-12 w-full justify-center items-center mb-16 bg-white p-8 sm:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Form form={form} setForm={setForm} editFormData={editFormData} editData={editData} createData={createData} emptyForm={emptyForm} />
          </div>
          <div className="w-130 lg:w-1/2 flex justify-center items-center">
            <img
              src="/img/form-img-1.jpg"
              alt="Modern Abstract Dashboard"
              className="w-128 h-158 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 w-full overflow-x-auto">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Contacts Directory</h2>
              <span className="bg-violet-100 text-violet-800 text-sm font-semibold px-4 py-1.5 rounded-full">
                {data?.length} Total
              </span>
            </div>
            {loading && <Loader />}
            {errors && <Message msg={`Error ${errors.status}: ${errors.statusText}`} bgColor="#dc3545" />}
            {data && <Table data={data} setData={setData} setForm={setForm} editFormData={editFormData} setEditFormData={setEditFormData} editData={editData} deleteData={deleteData} />}
          </div>
        </div>
      </div>
    </div>
  )
}