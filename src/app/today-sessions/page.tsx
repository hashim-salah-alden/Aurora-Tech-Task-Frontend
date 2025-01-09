"use client"
import useReservations from "@/hooks/useReservations";
import Loading from "../../components/feedback/Loading"

// Define the session type, handling branch and doctor as arrays
type SessionType = {
  name: string;
  price: number;
};

type Doctor = {
  firstName: string;
};

type Branch = {
  name: string;
};

type Reservation = {
  sessionType: SessionType | SessionType[];
  branch: Branch[];  // branch is an array of Branch objects
  doctor: Doctor[];  // doctor is an array of Doctor objects
  time: string;
};

const TodaySessions = () => {
  const today = new Date();

  // Make sure the `reservations` is typed as `Reservation[]`
  const { reservations, loading, reservationsError } = useReservations({ today });

  return (
    <div className="min-h-screen bg-[#e8f6f8] p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">{" Today's Sessions "}</h1>

      <div className="space-y-4 max-w-screen-lg w-full mx-auto">
        <Loading loading={loading} error={reservationsError} page="Sessions">
          {reservations?.map((session: Reservation, index: number) => (
            <div
              key={index}
              className="bg-[#bfe7ec] p-1 md:p-4 rounded-lg shadow-md flex justify-between items-center mt-4"
            >
              {session && (
                <div>
                  <h2 className="md:text-lg font-semibold">
                    {Array.isArray(session?.sessionType)
                      ? session?.sessionType[0]?.name // Accessing the first element if sessionType is an array
                      : session?.sessionType?.name}
                  </h2>
                  {/* Safely access the first element of the branch array */}
                  <p className="text-sm text-gray-600">{session?.branch[0]?.name}</p>
                  {/* Safely access the first element of the doctor array */}
                  <p className="text-sm text-gray-600">{session?.doctor[0]?.firstName}</p>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <div className="text-lg font-bold text-gray-800">
                  <span>
                    {Array.isArray(session?.sessionType)
                      ? session?.sessionType[0]?.price // Accessing the first element if sessionType is an array
                      : session?.sessionType?.price}
                  </span>
                </div>
                <button className="bg-teal-500 text-sm text-white py-1 px-3 rounded-lg hover:bg-teal-600">
                  Confirm Payment
                </button>
                <span className="text-sm hidden md:block text-gray-500">{session?.time}</span>
              </div>
            </div>
          ))}
        </Loading>
      </div>
    </div>
  );
};

export default TodaySessions;
