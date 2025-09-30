import {AppDispatch, RootState} from '@/store/index';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

// Typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
