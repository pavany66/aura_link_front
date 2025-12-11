import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import AuraEffect from './AuraEffect';
// Removed unused supabase import

function LandingPage() {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    // NEW: Form State
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Form Submission Handler
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        if (!contactName || !contactEmail || !contactMessage) {
            return alert("Please fill in all fields before sending.");
        }

        // SIMULATION: Replace database call with a short delay to simulate network latency
        await new Promise(resolve => setTimeout(resolve, 500));

        // Success Pop-up
        window.alert("✅ Success! Your message has been sent to the admin. We will be in touch shortly.");

        // Clear form fields
        setContactName('');
        setContactEmail('');
        setContactMessage('');
    };

    return ( 
        <div className = "landing-page" >
            <div className = "background-image-container"
                style = {{ transform: `translateY(${offsetY * 0.5}px)` }} >
            </div> 
            <div className = "image-filter" > </div>

            <div className = "overlay-content" >
                <nav className = "navbar" >
                    <ul className = "nav-links" >
                        <li> <a href = "#about" > Explore Our World </a></li>
                        <li> <a href = "#contact" > Join the Mission </a></li> 
                        <li> <Link to = "/login" className = "register-button" > Log In </Link></li>
                    </ul> 
                </nav> 
                <div className = "hero-section" >
                    <AuraEffect />
                    <h1 className = "main-heading animated-text" > The Future of Education is Here </h1> 
                    <p className = "animated-text" > Experience the fusion of technology and knowledge. </p> 
                </div> 
            </div> 
            <section id = "about" className = "section" >
                <h2> About Us </h2> 
                <p> We are a team of innovators dedicated to creating a new dimension of learning.Our platform uses cutting - edge technology to make complex topics intuitive and engaging, preparing you for the challenges of tomorrow. </p> 
            </section> 
            <section id = "contact" className = "section" >
                <h2> Contact Us </h2> 
                <p> Ready to begin your journey ? Get in touch with our team to learn more about how our platform can unlock your full potential. </p> 
                <form className = "contact-form" onSubmit = { handleFormSubmit } >
                    <input type = "text"
                        placeholder = "Your Name"
                        value = { contactName }
                        onChange = { e => setContactName(e.target.value) }
                        required 
                    />
                    <input type = "email"
                        placeholder = "Your Email"
                        value = { contactEmail }
                        onChange = { e => setContactEmail(e.target.value) }
                        required 
                    />
                    <textarea placeholder = "Your Message"
                        value = { contactMessage }
                        onChange = { e => setContactMessage(e.target.value) }
                        required >
                    </textarea> 
                    <button type = "submit" className = "neon-button" > Send Message </button> 
                </form> 
            </section> 
        </div>
    );
}

export default LandingPage;