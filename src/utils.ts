import { useLocation } from 'react-router-dom';

export const useCurrentPath = (): string => {
  const location = useLocation();
  return location.pathname;
};
