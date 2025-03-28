import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {RootState, AppDispatch} from '@/store';

// Typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
