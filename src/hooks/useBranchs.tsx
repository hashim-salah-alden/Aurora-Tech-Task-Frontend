'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";

import { actGetBranchs } from "@/rtk/branchs/branchSlice";


const useBranchs = () => {
  const { branchs, loading, branchsError } = useAppSelector((state) => state.Branchs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(actGetBranchs());
    return () => {
      // cleadup fn here

      // to cansle unnecessary requests in background
      promise.abort();
    }
  }, [dispatch])

  return { branchs, loading, branchsError }
}

export default useBranchs