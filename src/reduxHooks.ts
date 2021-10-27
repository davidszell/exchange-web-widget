import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';

export const useAppDispatch = (): ThunkDispatch<RootState, void, AnyAction> => useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
