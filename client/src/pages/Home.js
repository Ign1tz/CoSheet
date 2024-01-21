import '../Style/Home.css';
import {Link} from "react-router-dom";

import Cookies from "universal-cookie"

export default function Home() {
    let cookie = new Cookies()
    let loggedIn = typeof cookie.get("username") === "undefined"
    let login = <a className="dashboard-button" href={"http://localhost:3000/login"}>Login/Signup</a>
    let dashboard = <a className="dashboard-button" href={"http://localhost:3000/dashboard"}>Dashboard</a>
    return (
        <div className="home-container">
            <header className="hero-header">
                <div className="header-content">
                    <button className="cosheet-button" data-text="Awesome">
                        <span className="actual-text">&nbsp;cosheet&nbsp;</span>
                        <span aria-hidden="true" className="hover-text">&nbsp;cosheet&nbsp;</span>
                    </button>
                </div>
            </header>
            <main>
                {loggedIn && login}
                {!loggedIn && dashboard}
                <section className="about">
                    <h3>Create and edit spreadsheets collaboratively and easily.</h3>
                    <p>CoSheet is an intuitive and easy-to-use platform for creating and editing spreadsheets.</p>
                    <p>Share your work with friends and collaborate on the same spreadsheet.</p>
                </section>
                <section className="creators">
                    <h4>Creators</h4>
                    <div className="creators-list">
                        <Link to={"https://github.com/Ign1tz"}>
                            <div className={"creatorName"}>Moritz Pertl</div>
                        </Link>
                        <Link to={"https://github.com/annapoglitsch"}>
                            <div className={"creatorName"}>Anna Poglitsch</div>
                        </Link>
                        <Link to={"https://github.com/elimei1"}>
                            <div className={"creatorName"}>Elias Meisl</div>
                        </Link>
                    </div>
                </section>
            </main>
            <footer>
                <p>© 2024 CoSheet. All rights reserved.</p>
            </footer>
        </div>
    )
}