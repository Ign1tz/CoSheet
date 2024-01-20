import '../Style/Home.css';

export default function Home() {
    return(
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
                <a className="dashboard-button" href={"http://localhost:3000/dashboard"}>
                    Dashboard
                </a>
                <section className="about">
                    <h3>Create and edit spreadsheets collaboratively and easily.</h3>
                    <p>CoSheet is an intuitive and easy-to-use platform for creating and editing spreadsheets.</p>
                    <p>Share your work with friends and collaborate on the same spreadsheet.</p>
                </section>
                <section className="creators">
                    <h4>Creators</h4>
                    <div className="creators-list">
                        <div>Moritz Pertl</div>
                        <div>Anna Poglitsch</div>
                        <div>Elias Meisl</div>
                    </div>
                </section>
            </main>
            <footer>
                <p>© 2024 CoSheet. All rights reserved.</p>
            </footer>
        </div>
    )
}