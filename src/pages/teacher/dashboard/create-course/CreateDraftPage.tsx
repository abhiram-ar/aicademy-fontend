import React from "react";
import CreateDraftForm from "./CreateDraftForm";

const CreateCoursePage: React.FC = () => {
    return (
        <div className="mx-10">
            <h1 className="text-xl font-semibold">Create Course</h1>
            <CreateDraftForm />
        </div>
    );
};

export default CreateCoursePage;
