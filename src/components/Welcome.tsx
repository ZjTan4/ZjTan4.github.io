
import "@assets/styles/components.css"

const WelcomeSection: React.FC = () => {
    return (
        <header className="welcome-section">
            <div className="welcome-content frost-glass">
                <div className="profile-photo">
                    <img src="/TODO.jpg" alt="Zijie Tan" />
                </div>
                <h1>Zijie Tan</h1>
                <p>ztan4@ualberta.ca</p>
            </div>
        </header>
    );
}

export default WelcomeSection;
 