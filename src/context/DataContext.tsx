import React, { useState, createContext } from "react";

// type Order = {
//     productId: number;
//     name: string | null;
//     quantity: number;
// } | null;

// type IData = {
//    data: Order[];
//     setData: (data: Order[]) => void;
// };


export const DataContext = createContext<[[], React.Dispatch<React.SetStateAction<[]>>] | null>(null);


export function DataProvider({children}:any) {
    // const [data, setData] = useState<IData>({data: [], setData: (data: Order[]) => {}});
  
    const [data, setData] = useState<[]>([]);
    return (
      <DataContext.Provider value={[data, setData]}>
        {children}
      </DataContext.Provider>
    );
  }