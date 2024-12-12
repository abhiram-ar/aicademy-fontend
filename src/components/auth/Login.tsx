import AuthBlock from "../base/AuthBlock";
import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // return (
    //   <form onSubmit={handleSubmit((data) => console.log(data))}>
    //     <input {...register('lastName', { required: true })} />
    //     {errors.lastName && <p>Last name is required.</p>}
    //     <input {...register('age', { pattern: /\d+/ })} />
    //     {errors.age && <p>Please enter number for age.</p>}
    //     <input type="submit" />
    //   </form>
    // );

    return (
        <AuthBlock>
            <form onSubmit={handleSubmit((data) => console.log(data))} className="flex flex-col gap-5">
                {/* email */}
                <div>
                    <label htmlFor="email" className="font-semibold">email</label><br />
                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern:
                                // eslint-disable-next-line no-useless-escape
                                /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                        })}
                        placeholder="email"
                        id="email"
                        className="input-neo w-80"
                    />
                    {errors.email?.type === "required" && (
                        <p className="validation-error">Email is required</p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="validation-error">Invalid email</p>
                    )}
                </div>

                {/* password */}
                <div>
                    <label htmlFor="password" className="font-semibold">password</label><br />
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                        placeholder="password"
                        id="password"
                        className="input-neo w-80"
                    />
                    {errors.password?.type === "required" && (
                        <p className="validation-error">
                            password is required
                        </p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="validation-error">
                            8 characters required
                        </p>
                    )}
                </div>

                <button type="submit" className="py-2 px-3 border-2 border-black bg-white rounded-base w-full ">Login</button>
            </form>
            <div className="flex justify-between items-center my-5">
              <hr className="text-black border border-black w-2/5" />
              OR

              <hr className="text-black border border-black w-2/5" />
            </div>
        </AuthBlock>
    );
};

export default Login;
