import testimoryUser1 from "@/assets/t1.png";
import testimoryUser2 from "@/assets/t2.png";
import testimoryUser3 from "@/assets/t3.png";
import testimoryUser4 from "@/assets/t4.png";
import testimoryUser5 from "@/assets/t5.png";
import testimoryUser6 from "@/assets/t6.png";

const testimonials: { message: string; profileImg: string; user: string }[] = [
    {
        message:
            "This platform has completely transformed the way I learn! The AI-powered doubt-solving feature is a lifesaver—it feels like having a personal tutor available 24/7.",
        profileImg: testimoryUser1,
        user: "Arjun R., Computer Science Student",
    },
    {
        message:
            "As a teacher, I love how easy it is to create courses and track my students' progress. The AI tools also help me address their doubts more effectively, saving time and enhancing learning.",
        profileImg: testimoryUser2,
        user: "Meera S., High School Teacher",
    },
    {
        message:
            "The combination of certifications and personalized learning tools has helped me upskill efficiently. The AI-assisted answers are always on point, making complex concepts much easier to grasp.",
        profileImg: testimoryUser3,
        user: "Rohit K., Data Analyst",
    },
    {
        message:
            "This platform makes learning so engaging for my child. The AI feature is incredible—it answers doubts clearly and helps reinforce concepts taught in class",
        profileImg: testimoryUser4,
        user: "Lakshmi N., Parent of a 10th Grader",
    },
    {
        message:
            "We use this LMS for employee training, and it’s been amazing. The AI-driven features ensure our team gets clear answers to their questions, making learning more effective.",
        profileImg: testimoryUser5,
        user: "Kiran M., HR Manager, TechCorp",
    },
    {
        message:
            "The platform is so user-friendly! I can easily track my progress, access my courses, and revisit materials anytime. It has made learning so much more organized and efficient.",
        profileImg: testimoryUser6,
        user: "Sneha R., Business Management Student",
    },
];

const TestimonialSection = () => {
    return (
        <div className="w-11/12 lg:w-10/12 xl:w-8/12 mx-auto  py-16 font-publicSans">
            {" "}
            <div className="w-fit mx-auto">
                <h3 className="text-4xl text-center font-bold">
                    What Our Students Are Saying
                </h3>
            </div>
            {/* tesimaonial container */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-5">
                {testimonials &&
                    testimonials.map((item, index) => (
                        <div
                            key={index + 50}
                            className="border-4 border-black rounded-base p-8 bg-white relative"
                        >
                            <p>"{item.message}"</p>
                            <div className="h-16"></div>
                            <div className="flex justify-between items-center gap-2 mt-5 absolute bottom-6 pe-4">
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.profileImg}
                                        className="size-12"
                                        alt=""
                                    />
                                </div>
                                <p> {item.user}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TestimonialSection;
