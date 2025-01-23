import c0 from "@/assets/companies/0.png";
import c1 from "@/assets/companies/1.png";
import c2 from "@/assets/companies/2.png";
import c3 from "@/assets/companies/3.png";
import c4 from "@/assets/companies/4.png";
import c5 from "@/assets/companies/5.png";
import c6 from "@/assets/companies/6.png";
import c7 from "@/assets/companies/7.png";
import c8 from "@/assets/companies/8.png";

const Companies = () => {
    const items = [c6, c0, c2, c3, c4, c8, c5, c1, c7];
    const imgs = Array.from({ length: 9 }).map((_, index) => (
        <img key={index} src={items[index]} className="saturate-0" />
    ));
    return (
        <div className="mt-5">
            <p className="text-center font-publicSans my-2">
                OUR STUDENTS ARE WORKING AT
            </p>
            <div className="grid grid-cols-3 md:grid-cols-9 justify-center items-center gap-20 md:gap-10 xl:gap-20 px-5 xl:px-10 py-5 xl:py-8 md:y-5 bg-white border-y-4 border-black">
                {imgs}
            </div>
        </div>
    );
};

export default Companies;
