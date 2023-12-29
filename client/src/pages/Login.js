import './Login.css'

export default function Login() {
    return (
        <div className="container">
            <div className="heading">Sign In</div>
            <form action="" className="form">
                <input required="" className="input" type="email" name="email" id="email" placeholder="E-mail"/>
                <input required="" className="input" type="password" name="password" id="password"
                placeholder="Password"/>
                <span className="forgot-password"><a href="#">Don't have an account yet?</a></span>
                <input className="login-button" type="submit" value="Sign In"/>
            </form>
        </div>
    )
}
