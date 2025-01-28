import { ReactNode, Suspense } from "react";
import { HashLoader } from "react-spinners";

export const WrappinSuspense = (component: ReactNode) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <HashLoader></HashLoader>
        </div>
      }
    >
      {component}
    </Suspense>
  );
};
