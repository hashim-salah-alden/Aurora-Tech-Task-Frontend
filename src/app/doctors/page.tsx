'use client'
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import Image from "next/image";


import useDoctors from "@/hooks/useDoctors";
import { useAppDispatch } from "../../rtk/hooks";
import { actDeleteDoctor } from "../../rtk/doctors/doctorsSlice";
import Loading from "../../components/feedback/Loading"

const Doctors = () => {
  const { doctors, loading, doctorsError } = useDoctors();
  const dispatch = useAppDispatch();


  return (
    <div className="bg-[#e8f6f8] min-h-screen flex justify-center items-center px-4 py-10">
      <div className=" max-w-4xl w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Doctors</h1>
          <Link href="/add-doctor" className="flex items-center gap-2">
            <IoIosAddCircle size={20} />
            Add
          </Link>
        </div>

        {/* Doctor Cards */}
        <Loading loading={loading} error={doctorsError} page="Doctors">

          <div className="space-y-4">
            {doctors.map((doctor,index) => (
              <div
                key={index}
                className="bg-[#c0e7ec] rounded-lg p-4 flex justify-between items-center shadow"
              >
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full  flex items-center justify-center">
                    <Image
                      src="/avatar.jpg"
                      alt="avatar"
                      width={80}
                      height={80}
                    />
                  </div>
                  <p className="text-base font-medium">{doctor?.firstName} {doctor?.lastName}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 ">
                  <button className=" flex items-center gap-1 cursor-pointer text-sm font-semibold">
                    <MdOutlineModeEditOutline />
                    Edit
                  </button>
                  <button onClick={() => dispatch(actDeleteDoctor(doctor?.id))} className="t flex items-center gap-1 cursor-pointer text-sm font-semibold">
                    <MdDelete />
                    Delete Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default Doctors;
