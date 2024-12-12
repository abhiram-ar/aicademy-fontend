import GoogleIcon from "@mui/icons-material/Google";
const SignInWithGoogle = () => {
    return (
        <div className="w-fit mx-auto px-3 py-2 rounded-base bg-[#d9d9d9] flex justify-center items-center gap-2 border  border-black hover:bg-[#bababa] active:bg-zinc-400">
            <GoogleIcon />

            <button className="font-medium">SignIn with Google</button>
        </div>
    );
};

export default SignInWithGoogle;
