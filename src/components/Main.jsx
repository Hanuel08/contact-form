import { useState, useEffect, useMemo } from "react"
import { Form } from "./Form.jsx"
import { Table } from "./Table.jsx"
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

const URL = import.meta.env.VITE_API_URL || "/users"

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
    <main id="page-top" className="font-sans pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <section className="w-full mt-6 sm:mt-10">
          <div className="flex flex-col xl:flex-row gap-10 w-full justify-center items-stretch mb-10 bg-white/90 dark:bg-slate-900/60 backdrop-blur supports-backdrop-filter:bg-white/70 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 ring-1 ring-slate-200/70 dark:ring-white/10">
            <div id="contact-form" className="w-full xl:w-1/2 flex justify-center items-center">
              <Form form={form} setForm={setForm} editFormData={editFormData} editData={editData} createData={createData} emptyForm={emptyForm} />
            </div>
            <div className="hidden xl:flex xl:w-1/2 justify-center items-center">
              <img
                src="/img/form-img-1.jpg"
                alt="Modern Abstract Dashboard"
                className="w-full max-w-xl h-136 object-cover rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-black/40"
              />
            </div>
          </div>
        </section>

        <section id="contacts-table" className="w-full">
          <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur supports-backdrop-filter:bg-white/70 p-5 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 w-full overflow-x-auto ring-1 ring-slate-200/70 dark:ring-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 px-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                Contacts Directory
              </h2>
              <span className="w-fit bg-violet-100 text-violet-900 dark:bg-violet-500/15 dark:text-violet-200 text-sm font-semibold px-4 py-1.5 rounded-full ring-1 ring-violet-200/80 dark:ring-violet-300/20">
                {data?.length ?? 0} Total
              </span>
            </div>
            {loading && <Loader />}
            {errors && <Message msg={`Error ${errors.status}: ${errors.statusText}`} bgColor="#dc3545" />}
            {data && (
              <Table
                data={data}
                setData={setData}
                setForm={setForm}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                editData={editData}
                deleteData={deleteData}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}