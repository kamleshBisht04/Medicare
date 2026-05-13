/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { doctors } from '../assets/assets';

export const AppContext = createContext();

// provider
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const value = { doctors, currency };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
// custome hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider ');
  }
  return context;
};

export default AppContextProvider;
