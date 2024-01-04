import '../Style/ProfileSettings.css'
export default function ProfileSettings() {
    function logout() {
            alert('Logout successful!');

    }
    function saveChanges() {
        alert('Save changes successful!');
    }

    function GoBack() {
        alert('Go Back.');
    }
    return (
        <div className="container">
            <h1>Profile Settings</h1>
            <form action="#" method="post">
                <input type="text" id="username" name="username" placeholder="Username" required/>
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <input type="password" id="password" name="password" placeholder="Password" required/>

                <button className="saveChanges" onClick={saveChanges}>
                    Save Changes
                </button>
                <button className="GoBack" onClick={GoBack}>
                    Go Back
                </button>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </form>
        </div>
    )
}