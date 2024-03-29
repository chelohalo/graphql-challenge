import React, { useState, createContext } from "react";

export type Orders = {
  name: string | null;
  price: number;
}[] | null;



export const DataContext = createContext<[Orders, React.Dispatch<React.SetStateAction<[]>>] | null>(null);


export function DataProvider({children}:any) {
  
    const [data, setData] = useState<[]>([]);
    return (
      <DataContext.Provider value={[data, setData]}>
        {children}
      </DataContext.Provider>
    );
  }