import { configureStore } from "@reduxjs/toolkit";
import Doctors from "./doctors/doctorsSlice";
import Branchs from "./branchs/branchSlice";
import Reservations from "./reservations/reservationSlice";
import SessionsTypes from "./sessionsTypes/sessionsTypesSlice";

const store = configureStore({
  reducer: {
    Doctors,
    Branchs,
    Reservations,
    SessionsTypes,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
