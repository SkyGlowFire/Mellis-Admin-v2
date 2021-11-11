import { FC, useState, useContext } from 'react';

import { ConfirmContext } from './confirmContext';

export const ConfirmProvider: FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [yesBtnText, setYesBtnText] = useState<string>('Yes');
  const [noBtnText, setNoBtnText] = useState<string>('No');
  return (
    <ConfirmContext.Provider
      value={{
        show,
        text,
        setShow,
        setText,
        title,
        setTitle,
        yesBtnText,
        noBtnText,
        setYesBtnText,
        setNoBtnText,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};

export const useConfirmContext = () => useContext(ConfirmContext);
