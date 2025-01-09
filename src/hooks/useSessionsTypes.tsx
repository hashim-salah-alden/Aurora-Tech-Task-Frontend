'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";

import { actGetSessions } from "@/rtk/sessionsTypes/sessionsTypesSlice";


const useSessionsTypes = () => {
  const { sessionsTypes, loading, sessionsTypesError } = useAppSelector((state) => state.SessionsTypes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(actGetSessions());
    return () => {
      // cleadup fn here

      // to cansle unnecessary requests in background
      promise.abort();
    }
  }, [dispatch])

  return { sessionsTypes, loading, sessionsTypesError }
}

export default useSessionsTypes