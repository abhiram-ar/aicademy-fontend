import React from "react";
import { Link } from "react-router-dom";

const FIlterCategoryNav = () => {
    return (
        <div className="bg-white flex justify-center items-center gap-2 p-5 border-b-4 border-black -mt-1 relative z-30 ">
            <Link to="#" className="border border-black rounded-base bg-yellow-300 explore-nav">All</Link>
            <Link to="#" className="explore-nav">Web development</Link>
            <Link to="#" className="explore-nav">AI/ML</Link>
            <Link to="#" className="explore-nav">Database</Link>
            <Link to="#" className="explore-nav">Data science</Link>
            <Link to="#" className="explore-nav">Personal deveopment</Link>
            <Link to="#" className="explore-nav">Health and Fitness</Link>
            <Link to="#" className="explore-nav">Editing</Link>
            <Link to="#" className="explore-nav">Other</Link>
        </div>
    );
};

export default FIlterCategoryNav;
