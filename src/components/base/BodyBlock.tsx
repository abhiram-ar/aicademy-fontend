import React, { ReactNode } from "react";

const BodyBlock: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return <div className="bg-paperYellow h-fit w-full">{children}</div>;
};

export default BodyBlock;
