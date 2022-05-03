import { useEffect } from 'react';
import useTimeout from '../plume-http-react-hook-loader/timeoutHook';

export default function useDebounce(callback: () => void, delay: number, dependencies: any[]) {
  const { restartTimeout, stopTimeout } = useTimeout(callback, delay);
  useEffect(restartTimeout, [...dependencies, restartTimeout]);
  useEffect(stopTimeout, []);
}