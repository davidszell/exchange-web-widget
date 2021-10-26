import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";

export const useAppDispatch = (): ThunkDispatch<RootState, any, AnyAction> => useDispatch<ThunkDispatch<RootState, any, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector