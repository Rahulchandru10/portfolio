import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Home.css';
import ContactMe from './ContactMe'; 
import personal_img from '../images/personal1.jpg'
const Home = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const resumeRef = useRef(null);

  const handleContactToggle = () => {
    setShowContact(!showContact);
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Uncomment to show welcome message
  /*
  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  */

  const openresume = () => {
    const resume = process.env.REACT_APP_RESUME_URL;
    if (resume) {
        window.open(resume, "_blank");
    } else {
        console.error("Resume URL is not defined in the environment variables.");
    }
  };

  return (
    <div className={`home ${showWelcome ? 'blurred' : ''}`}>
      {showWelcome && (
        <div className="welcome-message">
          <h1>Welcome to My World!!!</h1>
          <p>Wanna know about me? Take a look!!!</p>
        </div>
      )}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MSR</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link onClick={() => scrollToSection(aboutRef)}>About Me</Nav.Link>
            <Nav.Link onClick={() => scrollToSection(projectsRef)}>Projects</Nav.Link>
            <Nav.Link onClick={() => scrollToSection(resumeRef)}>Resume</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleContactToggle}>
              Contact Me
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {showContact && (
        <div className="blurred-background"></div>
      )}

      {showContact && (
        <div className="contact-modal">
          <button className="close-button" onClick={handleContactToggle}>
            &times; 
          </button>
          <ContactMe />
        </div>
      )}
      <CardGroup className='content'>
        <Card className='section'>
          <Card.Img variant="top" src={personal_img} className="header-image" />
          <Card.Body>
            <p className="profile-text">Hello!! This is Ragul M S.</p>
          </Card.Body>
        </Card>
      </CardGroup>

      <div className='content'>
        <div ref={aboutRef} className="section">
          <h2>About Me</h2>
          <p>
            Hello! I am a passionate web developer currently pursuing a B.Tech in Computer Science and Business Systems at M. Kumarasamy College of Engineering. With a strong foundation in technologies like Node.js, React.js, and MySQL, I enjoy building efficient and scalable web applications. I am actively looking for opportunities to further enhance my skills and contribute to a dynamic organization. I believe in the power of collaboration and am eager to learn from experienced professionals while also bringing value to the team.
          </p>
        </div>
        
        <div ref={projectsRef} className="section">
          <h2>Projects</h2>
          <ul>
            <li>
              <strong>E-Commerce Application</strong>
              <p>
                I developed an e-commerce application using <strong>React.js</strong> for the frontend, <strong>Node.js</strong> for the backend, and <strong>MySQL</strong> for the database. This application features admin functionality that allows for the addition of new products, as well as user accounts for browsing and purchasing items. The goal was to create a seamless shopping experience for users while providing powerful management tools for administrators.
              </p>
            </li>
            <li>
              <strong>Employee Management System</strong>
              <p>
                I created an <strong>Employee Management System</strong> using <strong>React.js</strong>, <strong>Spring Boot</strong>, and <strong>MySQL</strong>. This system incorporates comprehensive CRUD (Create, Read, Update, Delete) operations, enabling administrators to efficiently manage employee details. Admin can easily add, view, update, and delete employee records, streamlining administrative tasks and enhancing overall productivity.
              </p>
            </li>
          </ul>
        </div>
        
        <div ref={resumeRef} className="section">
          <h2>Resume</h2>
          <p>Here is my resume check it out !!!</p>
          <button className="btn btn-primary" onClick={openresume}>Download Resume</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
