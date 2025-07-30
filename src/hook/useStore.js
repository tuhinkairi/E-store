import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook for typed dispatch.
 */
export const useAppDispatch = () => useDispatch();

/**
 * Custom hook for typed selector.
 * @param {Function} selector 
 * @returns {any}
 */
export const useAppSelector = useSelector;
