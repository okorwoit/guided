import React from 'react';
import './LandingPage.css';
import { useState } from 'react';
import SignUp from './Signup';
import Login from './Login';

const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (showSignUp) {
    return <SignUp />;
  }

  if (showLogin) {
    return <Login />; // Render the Login component if showLogin is true
  }
  
    return (
      <>
      {showSignUp ? <SignUp /> :
        <div>
            <nav>
                <div className="logo">
                    <h1>Guided</h1>
                </div>
                <div className="menu">
                    <button onClick={() => setShowLogin(true)}>Login</button>
                    <button className="signup-button" onClick={()=>setShowSignUp(true)}>Sign Up</button>
                </div>
            </nav>

            <header>
                <div className="header-content">
                    <h1>Welcome to Guided - Your Mentorship Platform</h1>
                    <p>At Guided, we believe in the power of mentorship to shape and elevate your career journey. Our platform connects students with experienced mentors, providing valuable insights and guidance across various domains.</p>
                    {/* <div className="cta-buttons">
                        <a href="login.html">Log In</a>
                        <a href="signup.html">Sign Up</a>
                    </div> */}
                </div>
                <img src="images/mentorship.jpeg" alt="Header Image" />
            </header>

            <section className="about-us">
                <h2>About Us</h2>
                <img src="images/coaching.jpeg" alt="About Us Image" className="about-us-image" />
                <p>Discover a community-driven space where students and mentors converge for career development. We offer mentorship opportunities in three key categories:</p>
                <ul>
                    <li>Career Advice: Gain insights and advice to navigate your professional journey.</li>
                    <li>Resume Review: Receive constructive feedback to enhance your resume's impact.</li>
                    <li>Mock Interviews: Practice and refine your interview skills with experienced professionals.</li>
                </ul>
                <p>Join Guided and embark on a journey of growth and learning. <a href="about-us.html">Learn more about us</a>.</p>
            </section>

            <section className="cta">
                <h2>Ready to Get Started?</h2>
                <img src="images/mentorship.jpeg" alt="Get Started Image" className="get-started-image" />
                <p>Unlock your potential with Guided! Whether you're a student looking for guidance or a mentor eager to share knowledge, our platform provides the ideal space for meaningful connections.</p>
                <p>Log In or Sign Up now to explore mentorship opportunities, set your career goals, and connect with experienced mentors who can guide you towards success.</p>
                {/* <div className="cta-buttons">
                    <a href="login.html">Log In</a>
                    <a href="signup.html">Sign Up</a>
                </div> */}
            </section>

            <footer>
                <p>Have questions or need assistance? Reach out to us at contact@guided.com. We're here to help!</p>
                <p>© 2022 Guided. All rights reserved.</p>
            </footer>
        </div>
        }
        </>
    );
}

export default LandingPage;