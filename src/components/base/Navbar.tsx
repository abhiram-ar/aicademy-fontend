import React from "react";

type Props = {children?: React.ReactNode, justify?: string}

const Navbar: React.FC<Props> = ({children, justify="between"}) => {
    return (
        <div className={`w-full h-24 bg-white px-10 shadow-[0_4px] flex justify-${justify} items-center`}>
            {children}
        </div>
    );
};

export default Navbar;
