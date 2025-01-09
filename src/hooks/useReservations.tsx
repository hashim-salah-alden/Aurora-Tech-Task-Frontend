"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { actGetReservations, cleanReservation } from "@/rtk/reservations/reservationSlice";

type UseReservationsArgs = {
  today?: string | Date; // Optional parameter
};

const useReservations = ({ today }: UseReservationsArgs = {}) => {
  const { reservations, loading, reservationsError } = useAppSelector(
    (state) => state.Reservations // Assuming Reservations is typed in your Redux state
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Convert `today` to a string if it's a Date
    const todayString = today instanceof Date ? today.toISOString() : today || "";

    // Dispatch the action to fetch reservations
    dispatch(actGetReservations(todayString));

    // Cleanup on unmount
    return () => {
      dispatch(cleanReservation());
    };
  }, [dispatch, today]); // Re-run when `today` or `dispatch` changes

  // Return the necessary state and actions
  return { reservations, loading, reservationsError };
};

export default useReservations;
