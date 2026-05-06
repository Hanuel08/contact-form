import { EditBtn } from "./EditBtn";
import { DeleteBtn } from "./DeleteBtn";

export function Table({ data, setForm, setEditFormData, deleteData }){
  return (
    <>
      <div className="border-2 border-gray-200 rounded-lg px-2 w-full">
        <table className="w-full rounded-xl p-4">
          <thead className="">
            <tr className="">
              <th className="text-lg font-bold py-2">NAME</th>
              <th className="text-lg font-bold py-2">PHONE</th>
              <th className="text-lg font-bold py-2">EMAIL</th>
              <th className="text-lg font-bold py-2">AGE</th>
              <th className="text-lg font-bold py-2">DEPARTMENT</th>
              <th className="text-lg font-bold py-2">ACTIONS</th>
            </tr>
          </thead>

          <tbody>

            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-700 text-md py-10">NO HAY DATOS</td>
              </tr>
            ) : (
              data.toReversed().map(el => (
                <tr className="" key={crypto.randomUUID()}>
                  <td className="text-center p-2" >{el.name}</td>
                  <td className="text-center p-2" >{el.phone}</td>
                  <td className="text-center p-2" >{el.email}</td>
                  <td className="text-center p-2" >{el.age}</td>
                  <td className="text-center p-2" >{el.department}</td>
                  <td className="flex gap-4 p-2 items-center justify-center">
                    <EditBtn id={el.id} data={data} setForm={setForm} setEditFormData={setEditFormData} />
                    <DeleteBtn id={el.id} deleteData={deleteData} />
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
    </>
  )
}