import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{ width: '50%', margin: '0 auto', paddingTop: '5%' }}
    >
      <h2 className='mb-4 text-warning' style={{ fontWeight: '700' }}>
        Create Your Account
      </h2>
      <Form.Group controlId='validationCustom01' className='mb-4'>
        <Form.Label>Name</Form.Label>
        <Form.Control required type='text' placeholder='John' variant='dark' />
        <Form.Control.Feedback type='invalid'>
          Please enter a Name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='validationCustom02' className='mb-4'>
        <Form.Label>Email</Form.Label>
        <Form.Control required type='email' placeholder='john@gmail.com' />
        <Form.Control.Feedback type='invalid'>
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='validationCustom03' className='mb-5'>
        <Form.Label>Password</Form.Label>
        <Form.Control required type='password' placeholder='password' />
        <Form.Control.Feedback type='invalid'>
          Please enter a strong password.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default Register;
