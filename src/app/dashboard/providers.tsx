"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#29D"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
