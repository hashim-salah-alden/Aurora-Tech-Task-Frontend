"use client";
import Image from "next/image";
import useSessionsTypes from "@/hooks/useSessionsTypes";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../../rtk/hooks";
import { actAddReservation } from "@/rtk/reservations/reservationSlice";

interface Branch {
  branchId: string;
  branch: {
    id: string;
    name: string;
  };
}

interface Doctor {
  id: string;
  firstName: string;
}

interface AvailableDoctor {
  doctor?: Doctor;
  startingTime?: string;
  endingTime?: string;
}

interface SessionType {
  id: string;
  name: string;
  price: number;
}

interface ReservationType {
  sessionTypeId: string;
  date: string;
  branchId: string;
  time: string;
  doctorId: string;
}

const Reservation = () => {

  // hooks
  const { sessionsTypes, loading } = useSessionsTypes();
  const dispatch = useAppDispatch();


  // State variables with types
  const [sessionPrice, setSessionPrice] = useState<number | undefined>();
  const [avilabledoctorId, setAvilabledoctorId] = useState<AvailableDoctor[]>([]);
  const [sessionTypeId, setSessionTypeId] = useState<string>("");
  const [date, setDate] = useState<string | undefined>();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setbranchId] = useState<string>("");
  const [doctorId, setdoctorId] = useState<string>("");
  const [times, setTimes] = useState<string | undefined>("");
  const [timeRange, setTimeRange] = useState<string[] | undefined>([]); // Changed to array of strings

  // const shortDayName = (date: Date, locale: string) =>
  //   date.toLocaleDateString(locale, { weekday: "short" });
  // Fetch branches
  useEffect(() => {
    const getBranches = async () => {
      try {
        const res = await axios.get(
          `https://aurora-tech-task-backend.onrender.com/doctor-schedules?workingWeekdays=${date}`
        );

        setBranches(
          res.data.data.filter(
            (branch: Branch, index: number, self: Branch[]) =>
              index ===
              self.findIndex((b) => b.branchId === branch.branchId)
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (date) getBranches();
  }, [date]);

  // Fetch available doctorId
  useEffect(() => {
    const getdoctorId = async () => {
      try {
        const res = await axios.get(
          `https://aurora-tech-task-backend.onrender.com/doctor-schedules?workingWeekdays=${date}&branchId=${branchId}`
        );
        setAvilabledoctorId(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (branchId) getdoctorId();
  }, [branchId, branches]);

  // Function to generate time range between start and end
  const generateTimeRange = (
    start: string,
    end: string,
    interval: number
  ): string[] => {
    const range: string[] = [];
    let [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    while (
      startHour < endHour ||
      (startHour === endHour && startMinute <= endMinute)
    ) {
      const formattedTime = `${startHour
        .toString()
        .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;
      range.push(formattedTime);

      startMinute += interval;
      if (startMinute >= 60) {
        startMinute -= 60;
        startHour++;
      }
    }

    return range;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation: ReservationType = {
      sessionTypeId,
      date: date || "",
      branchId,
      time: times || "",
      doctorId,
    };

    dispatch(actAddReservation(newReservation));
  };

  const handleChooseDoctor = (choosenDoctorId: string) => {
    const choosenDoctorInfo = avilabledoctorId.find(
      (doctor) => doctor.doctor?.id === choosenDoctorId
    );

    if (choosenDoctorInfo) {

      if (choosenDoctorInfo.startingTime && choosenDoctorInfo.endingTime) {
        const timeRangeOfChoosenDoctor = generateTimeRange(
          choosenDoctorInfo.startingTime,
          choosenDoctorInfo.endingTime,
          30
        );
        setTimeRange(timeRangeOfChoosenDoctor);
      }
    }
  };

  function convertDateToISO(dateString: string) {
    // Create a new Date object from the given date string
    const date = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(date)) {
      throw new Error("Invalid date format");
    }

    // Return the ISO 8601 string
    setDate(date.toISOString())
  }


  function convertToISO(timeString: string): void {
    const now: Date = new Date();

    const [hours, minutes]: string[] = timeString.split(':');

    now.setHours(Number(hours));
    now.setMinutes(Number(minutes));
    now.setSeconds(0); // Set seconds to 0
    now.setMilliseconds(0); // Set milliseconds to 0

    setTimes(now.toISOString());
  }



  return (
    <div className="bg-[#e8f6f8] min-h-screen flex justify-center items-center px-4 py-10">
      <div className="max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Reservation</h1>
          {sessionTypeId && (
            <span className="text-xl font-semibold px-4 py-2">
              {sessionPrice}
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-24">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-semibold mb-2">
                Session Type
              </label>
              {loading === "succeeded" && (
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => {
                    setSessionTypeId(e.target.value);
                    sessionsTypes.forEach((session: SessionType) => {
                      if (session.id === e.target.value) {
                        setSessionPrice(session.price);
                      }
                    });
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="DEFAULT" disabled>
                    Select
                  </option>
                  {sessionsTypes.map((sessionType: SessionType, index: number) => (
                    <option key={index} value={sessionType.id}>
                      {sessionType.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Select Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                onChange={(e) => {
                  convertDateToISO(e.target.value);
                }}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Branch</label>
              <select
                defaultValue="DEFAULT"
                onChange={(e) => {
                  setbranchId(e.target.value)
                  setAvilabledoctorId("")
                  setTimeRange("");
                }}
                className="select select-bordered w-full"
              >
                <option value="DEFAULT" disabled>
                  Select
                </option>
                <option value="" >
                  None
                </option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch.branch.id}>
                    {branch.branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Doctor</label>
              <select
                defaultValue="DEFAULT"
                className="select select-bordered w-full"
                onChange={(e) => {
                  setdoctorId(e.target.value);
                  handleChooseDoctor(e.target.value);

                }}
              >
                <option value="DEFAULT" disabled>
                  Select
                </option>
                <option value="" >
                  None
                </option>
                {avilabledoctorId && avilabledoctorId.map((avilableDoctor, index) =>
                  avilableDoctor.doctor ? (
                    <option key={index} value={avilableDoctor.doctor.id}>
                      {avilableDoctor.doctor.firstName}
                    </option>
                  ) : null
                )}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Time</label>
              <select
                defaultValue="DEFAULT"
                className="select select-bordered w-full"
                onChange={(e) => convertToISO(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Select
                </option>

                {timeRange && timeRange.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn bg-[#287f89] text-slate-100 text-base w-full">
              Submit Reservation
            </button>
          </form>

          <div className="md:flex items-center hidden">
            <Image
              src="/main.png"
              alt="PhysioRehab Logo"
              width={800}
              height={80}
              className="h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
