import UserAppBar from "../components/user-app-bar";
import { PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <>
      <UserAppBar />
      {children}
    </>
  );
}
