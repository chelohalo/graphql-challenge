import React, { useState, createContext } from "react";

// export type Order = {
//     productId: number;
//     price: number;
//     name: string | null;
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