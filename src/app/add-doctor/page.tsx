"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";

import useBranchs from "@/hooks/useBranchs";
import { useAppDispatch } from "../../rtk/hooks";
import { actAddDoctor } from "@/rtk/doctors/doctorsSlice";


type Schedule = {
  branchId: string;
  startingTime: string;
  endingTime: string;
  workingWeekdays: string[];
};

interface Doctor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  schedules: Schedule[];
}


interface TimeOption {
  label12: string; // 12-hour format with AM/PM
  value24: string; // 24-hour format
}

const AddDoctor: React.FC = () => {
  const { branchs, loading } = useBranchs();
  const dispatch = useAppDispatch();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([
    { branchId: "", startingTime: "", endingTime: "", workingWeekdays: [] },
  ]);

  const handleAddBranch = () => {
    setSchedules([
      ...schedules,
      { branchId: "", startingTime: "", endingTime: "", workingWeekdays: [] },
    ]);
  };

  const handleRemoveBranch = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const handleBranchChange = (
    index: number,
    field: keyof Schedule,
    value: string | string[]
  ) => {
    const updatedBranches = schedules.map((branch, i) =>
      i === index ? { ...branch, [field]: value } : branch
    );
    setSchedules(updatedBranches);
  };

  const handleWeekdayChange = (index: number, day: string) => {
    const updatedBranches = schedules.map((schedule, i) => {
      if (i === index) {
        const workingWeekdays = schedule.workingWeekdays.includes(day)
          ? schedule.workingWeekdays.filter((d) => d !== day)
          : [...schedule.workingWeekdays, day];
        return { ...schedule, workingWeekdays };
      }
      return schedule;
    });
    setSchedules(updatedBranches);
  };


  // Function to generate time intervals as an array of objects
  const generateTimeOptions = (interval: number): TimeOption[] => {
    const times: TimeOption[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        // Generate 24-hour format
        const value24 = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        // Generate 12-hour format with AM/PM
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? "AM" : "PM";
        const label12 = `${hour12.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;

        // Add to the list
        times.push({ label12, value24 });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions(30); // 30-minute intervals



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDoctor: Doctor = {
      firstName,
      lastName,
      email,
      password,
      phone,
      schedules, // Ensure `schedules` is an array of `Schedule`
    };

    // Dispatch the action
    dispatch(actAddDoctor(newDoctor));
  };

  return (
    <div className="bg-[#e8f6f8] min-h-screen flex justify-center items-center px-4 py-10">
      <div className="max-w-screen-lg w-full p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">Add a Doctor</h1>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48 mb-8 flex flex-row">
            <div className="w-48 h-48 rounded-full flex items-center justify-center">
              <Image src="/avatar.jpg" alt="avatar" width={200} height={80} />
            </div>
            <button
              className="absolute right-[-10px] bottom-[40px] bg-teal-500 p-2 rounded-full shadow text-white"
              aria-label="Edit profile picture"
            >
              <CiEdit />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20123456789"
              className="input input-bordered w-full"
            />
          </div>

          {/* Branches */}
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b pb-4"
            >
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Branch
                </label>
                {loading === "succeeded" && (
                  <select
                    defaultValue={'DEFAULT'}
                    onChange={(e) =>
                      handleBranchChange(index, "branchId", e.target.value)
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="DEFAULT" disabled>Select</option>

                    {branchs && branchs?.map((branch, index) => (
                      <option key={index} value={branch.id}>{branch.name}</option>
                    ))

                    }
                  </select>)
                }
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Starting Time
                </label>
                <select
                  value={schedule.startingTime}
                  onChange={(e) =>
                    handleBranchChange(index, "startingTime", e.target.value)
                  }
                  className="input input-bordered w-full"
                >
                  {timeOptions.map((time) => (
                    <option key={time.value24} value={time.value24}>
                      {time.label12}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Ending Time
                </label>
                <select
                  value={schedule.endingTime}
                  onChange={(e) =>
                    handleBranchChange(index, "endingTime", e.target.value)
                  }
                  className="input input-bordered w-full"
                >
                  {timeOptions.map((time) => (
                    <option key={time.value24} value={time.value24}>
                      {time.label12}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-3">
                <label className="block text-sm font-semibold mb-1">
                  Working Weekdays
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(
                    (day) => (
                      <label key={day} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={schedule.workingWeekdays.includes(day)}
                          onChange={() => handleWeekdayChange(index, day)}
                          className="checkbox checkbox-sm"
                        />
                        {day}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Remove Branch */}
              {schedules.length > 1 && (
                <div className="col-span-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveBranch(index)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove Branch
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Branch */}
          <div>
            <button
              type="button"
              onClick={handleAddBranch}
              className="text-teal-500 hover:underline text-sm"
            >
              Add another branch
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-between">
            <Link href="/doctors" className="btn btn-outline btn-accent">
              Back
            </Link>
            <button
              type="submit"
              className="btn bg-[#287f89] text-slate-100 hover:bg-[#287f89]"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
