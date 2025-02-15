import facebook from "@/assets/socials/facebook.png";
import instagram from "@/assets/socials/instagram.png";
import twitter from "@/assets/socials/twitter.png";
import youtube from "@/assets/socials/youtube.png";
import linkedin from "@/assets/socials/linkedin.png";

const socials = [facebook, instagram, twitter, youtube, linkedin];

const Footer = () => {
    return (
        <div className="bg-[#212121] py-10">
            <div className=" grid grid-cols-1 md:grid-cols-3 py-20 px-5 md:px-10 lg:px-20 w-full lg:w-9/12 mx-auto justify-center items-start font-publicSans gap-10 lg:gap-24 text-darkText/70">
                <div className="">
                    <h2 className="font-semibold text-darkText mb-2">
                        About Us
                    </h2>
                    <p>
                        We are committed to revolutionizing education with a
                        powerful LMS that makes learning accessible,
                        personalized, and effective for everyone. Join us to
                        experience the future of learning
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold text-darkText mb-2">
                        Contact
                    </h2>
                    <p>Email: support@aicademy.com</p>
                    <p>Phone: +913-456-7890</p>
                    <p>
                        Address:123 Learning Lane, EdTech City, Knowledge State
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold text-darkText mb-2">
                        Socials
                    </h2>
                    <div className="flex items-center gap-5">
                        {socials.map((social, index) => (
                            <img key={index} src={social} className="h-8" />
                        ))}
                    </div>
                </div>
            </div>
            <p className="font-publicSans text-darkText text-center ">
                © 2024 AIcademy. All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;
