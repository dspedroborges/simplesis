"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Definindo o tipo do valor do contexto
interface GlobalContextType {
  globalValue: any;
  setGlobalValue: Dispatch<SetStateAction<any>>;
}

// Criando o contexto com o tipo inicial como undefined
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalValue, setGlobalValue] = useState<any>(null); // Pode inicializar com um valor padrão, se desejar

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para acessar o contexto
export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}