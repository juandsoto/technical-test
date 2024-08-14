import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AllowedDocumentType, Country } from '../types';

type AppState = {
  country: Country;
  documentType: AllowedDocumentType;
  documentFront: File | null;
  documentReverse: File | null;
};

type AppContextState = {
  isReadyForValidation: boolean;
  state: AppState;
  setState: (newState: Partial<AppState>) => void;
};

const initialState: AppState = {
  country: 'co',
  documentType: 'national-id',
  documentFront: null,
  documentReverse: null
};

const AppContext = React.createContext<AppContextState>({
  isReadyForValidation: false,
  state: initialState,
  setState: () => {}
});

function AppContextProvider({ children }: PropsWithChildren) {
  const [isReadyForValidation, setIsReadyForValidation] = useState<boolean>(false);
  const [state, _setState] = useState<AppState>(initialState);

  const setState = (newState: Partial<AppState>) => {
    if (newState.country === 'all') {
      newState.documentType = 'passport';
    }
    _setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    const stateHasNullValues = !Object.values(state).every((value) => value !== null);
    if (stateHasNullValues) return setIsReadyForValidation(false);
    setIsReadyForValidation(true);
  }, [state]);

  return <AppContext.Provider value={{ isReadyForValidation, state, setState }}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  return React.useContext(AppContext);
};

export default AppContextProvider;
