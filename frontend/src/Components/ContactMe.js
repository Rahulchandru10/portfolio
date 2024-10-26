import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactMe = ()=>{
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const  USER_ID = process.env.REACT_APP_USER_ID;
  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    const templateParams = {
      from_email: email,
      message: message,
    };
    setLoading(true); 
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setEmail('');
        setMessage('');
        alert('Message sent successfully!');
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        console.log(error.text)
        alert('Failed to send message, please try again later.');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div>
      {showForm ? (
        <Form className="form" onSubmit={handleSendMessage}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Textarea</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)}/>
          </Form.Group>
          <Button variant="secondary" className="mb-3 w-100" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Form>
      ) : (
        <p>"Thank you for reaching out! We appreciate your message and will respond shortly."</p>
      )}
    </div>
  );
}

export default ContactMe;
