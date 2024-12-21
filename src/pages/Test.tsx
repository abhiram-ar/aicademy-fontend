import  { useState } from "react";
import axios from "axios"

export const Test = () => {
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try{
                const response = await axios.post("http://localhost:3000/api/course/upload/presignedurl", {
                    
                })
                console.log(response);
            }catch(error){
                console.log(`error while uplaodijng`)
                console.log(error);;
            }
        } else {
            alert("Please selecta file");
        }
    };
    return (
        <div>
            <input type="file" onChange={handleFile} />
            <button onClick={handleUpload}>upload</button>
        </div>
    );
};
