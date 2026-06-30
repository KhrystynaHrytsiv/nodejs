import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../interfaces/IAuth";
import { useAppDispatch, useAppSelector } from "../hook/reduxHooks";
import { authActions } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const login:SubmitHandler<IAuth> = async (user) =>{
        const {meta:{requestStatus}} = await dispatch(authActions.login({ user }));
        if (requestStatus === 'fulfilled'){
            navigate('/pizzas')
        }
    };
    return (
        <form onSubmit={handleSubmit(login)} >
            <input type={'email'} placeholder={"Enter your email"} {...register('email')}/>
            <input type={'password'} placeholder={"Enter your password"} {...register('password')}/>
            <button>Log in</button>
            {error && <div>Username or password incorrect</div>}
        </form>
    );
};

export { LoginPage };