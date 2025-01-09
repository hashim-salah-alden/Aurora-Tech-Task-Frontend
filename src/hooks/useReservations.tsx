/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../rtk/hooks';
import { actGetReservations, cleanReservation } from '@/rtk/reservations/reservationSlice';

type UseReservationsArgs = {
  today?: string | Date  ; // today is optional
};

const useReservations = ({ today }: UseReservationsArgs = {}) => {
  // Debugging logs to check today value and type
  if (today) console.log(typeof today, today);

  const { reservations, loading, reservationsError } = useAppSelector(
    (state) => state.Reservations
  );
  const dispatch = useAppDispatch();

  // Effect to dispatch action to fetch reservations
  useEffect(() => {
    // If `today` is provided, pass it as argument, otherwise pass an empty string
    dispatch(actGetReservations(today || ''));

    // Cleanup function
    return () => {
      // Clean up any reservations on unmount or when today changes
      dispatch(cleanReservation());
    };
  }, [dispatch]); // Re-run when today changes or on mount

  // Returning necessary state
  return { reservations, loading, reservationsError };
};

export default useReservations;
