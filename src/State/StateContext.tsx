import React, {createContext, useContext, useReducer} from 'react';
import {ApplicationReducer} from './Reducer';
import {StateType, ApplicationState} from './DefaultState';

export const StateContext = createContext(ApplicationState);

export const StateProvider = ({
  children,
  initialState,
  reducer,
}: {
  children: JSX.Element;
  initialState: StateType;
  reducer: typeof ApplicationReducer;
}) => {
  // @ts-ignore
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    //@ts-ignore
    <StateContext.Provider value={[globalState, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
