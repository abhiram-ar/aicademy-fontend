const Navbar = ({children}) => {
    return (
        <div className={`w-full h-24 bg-white px-10 shadow-[0_4px] flex justify-between items-center`}>
            {children}
        </div>
    );
};

export default Navbar;
