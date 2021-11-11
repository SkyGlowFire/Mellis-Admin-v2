import {
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface IConfirmContext {
  show: boolean;
  text: string;
  title: string;
  yesBtnText: string;
  noBtnText: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setYesBtnText: Dispatch<SetStateAction<string>>;
  setNoBtnText: Dispatch<SetStateAction<string>>;
}

const initialState = {
  show: false,
  text: '',
  yesBtnText: 'Yes',
  noBtnText: 'No',
  title: '',
  setTitle: () => {},
  setYesBtnText: () => {},
  setNoBtnText: () => {},
  setShow: () => {},
  setText: () => {},
};

export const ConfirmContext = createContext<IConfirmContext>(initialState);