import React, { ReactNode } from "react";

type Props = { children?: ReactNode };

const AuthBlock: React.FC<Props> = ({ children }) => {
    return <div className="bg-[#e0e7f1] border-2 border-black py-10 px-8  w-fit shadow-light rounded-base min-w-80"> 
        {children}</div>;
};

export default AuthBlock;
