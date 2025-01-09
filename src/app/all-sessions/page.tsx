"use client"
import useReservations from "@/hooks/useReservations";
import Loading from "../../components/feedback/Loading"
// import { Reservation } from "@/rtk/reservations/reservationSlice";


const AllSessions = () => {
  const { reservations, loading, reservationsError } = useReservations();

  return (
    <div className="min-h-screen bg-[#e8f6f8] p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">{" All Sessions "}</h1>

      <div className="space-y-4 max-w-screen-lg w-full mx-auto">
        <Loading loading={loading} error={reservationsError} page="Sessions">
          {reservations?.map((session: Reservation, index: number) => (
            <div
              key={index}
              className="bg-[#bfe7ec] p-1 md:p-4 rounded-lg shadow-md flex justify-between items-center mt-4"
            >
              <div>
                <h2 className="md:text-lg font-semibold">{session?.sessionType?.name}</h2>
                <p className="text-sm text-gray-600">{session?.branch?.name}</p>
                <p className="text-sm text-gray-600">{session?.doctor?.firstName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="md:text-lg font-bold text-gray-800">
                  <span>
                    {session?.sessionType?.price}
                  </span>
                </div>
                <button className="bg-teal-500 text-sm text-white py-1 px-1 md:px-3 rounded-lg hover:bg-teal-600">
                  Confirm Payment
                </button>
                <span className="text-sm hidden md:block text-gray-500">{session?.time}</span>
              </div>
            </div>
          ))}
        </Loading>
      </div>

    </div >
  )
}

export default AllSessions