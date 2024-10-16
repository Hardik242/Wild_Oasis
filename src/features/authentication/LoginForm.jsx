import {useState} from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import {useLogin} from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
    const [email, setEmail] = useState("Hardik@example1.com");
    const [password, setPassword] = useState("test01234");
    const {login, isLoading} = useLogin();

    const [pwType, setPwType] = useState("password");

    function handleRevealPassword(e) {
        pwType === "password" ? setPwType("text") : setPwType("password");
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return;

        login({email, password});
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>

            <FormRowVertical label="Password">
                <Input
                    type={pwType}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>

            <FormRowVertical label="Show Password" type="show">
                <Input
                    type="checkbox"
                    id="reveal"
                    onChange={handleRevealPassword}
                    disabled={isLoading}
                />
            </FormRowVertical>

            <FormRowVertical>
                <Button size="large" disabled={isLoading}>
                    {isLoading ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
