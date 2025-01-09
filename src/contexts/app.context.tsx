"use client";
import { engagements } from "@/data/engagements.data";
import { Engagement } from "@/interfaces/engagement.type";
import { createContext } from "@/utils/createContext.util";
import { ReactNode } from "react";

type AppContextProps = {
  engagements: Engagement[];
};

const [AppContext, useAppContext] = createContext<AppContextProps>();

type AppContextProviderProps = { children: ReactNode };

const AppContextProvider = (props: AppContextProviderProps) => {
  const { children } = props;

  return <AppContext value={{ engagements }}>{children}</AppContext>;
};

export { AppContextProvider, useAppContext };
