import { useState } from "react"
import { makeGroupPermanent } from "../redux/actions/groupActions"
import {useDispatch} from "react-redux"

const GroupDetails = ({location ,name ,topic,  description , radius , members , group_type, _id}) => {

  let dispatch = useDispatch()

  let [permanent, setPermanent] = useState(false)
  
  const handleGroupPermanent = () => {
//   TODO: w8ing for backend to make makegrPermanent if not already  (exist) , vice versa to make it temporary (reqd)
    dispatch(makeGroupPermanent(_id))
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white overflow-y-scroll">
      <div className="py-4 px-6 w-full flex flex-col items-center">
        <div className="flex-shrink-0 mb-4">
          <img
            className="h-25 w-25 rounded-full ring-2 ring-offset-2 ring-fuchsia-900"
            src="https://via.placeholder.com/150"
            alt="Group Avatar"
          />
        </div>
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-sm">{topic}</p>
          <span className="py-1 px-2 bg-blue-500 text-white rounded-full text-xs ">
            {group_type}
          </span>
        </div>
      </div>

      <div className=" p-3 w-full">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Description
        </h2>
        <p className="ms-1 text-sm  font-thin text-zinc-600">
          {description}
        </p>
      </div>

      <div className=" w-full p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2  text-gray-700">Media</h2>
      </div>

      <div className=" w-full p-4 mt-4 ">
        <h2 className="text-lg font-semibold mb-2  text-zinc-700">Members</h2>
       
       
        {
            members?.map((member, id) => (
                <div className="flex items-center space-x-4 mt-1 hover:bg-slate-200 hover:scale-105 transition-all ease-in p-1 rounded-md" key ={id}>
                    <div className="flex-shrink-0">
                        <img
                        className="h-10 w-10 rounded-full"
                        src={`https://randomuser.me/api/portraits/men/${id+1}.jpg`}
                        alt={`Member ${id}`}
                        />
                    </div>
                    <div className="">
                        <p className="font-semibold">{member.user.username}</p>
                        <p className="text-sm text-gray-600">{member.status}</p>
                    </div>
                </div>
            )
            )
        }
     
     
      </div>

      <div className=" py-4 px-6 w-full mt-4 flex items-center justify-center">
        <button
          className="bg-sky-400 hover:bg-sky-500 px-4 py-2 rounded-md transition-colors ease-in"
          onClick={handleGroupPermanent}
        >
          Make Permanent
        </button>
      </div>
    </div>
  )
}

export default GroupDetails
