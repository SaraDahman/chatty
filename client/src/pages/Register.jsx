import { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import GoogleAuth from '../components/GoogleAuth';

const Register = () => {
  const [validated, setValidated] = useState(false);
  const { registerInfo, updateRegisterInfo, registerMutation } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      registerMutation.mutate(registerInfo);
    }
    setValidated(true);
  };

  return (
    <div style={{ width: '30%', margin: '0 auto', paddingTop: '2rem' }}>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='mb-4'
      >
        <h2 className='mb-4 text-warning' style={{ fontWeight: '700' }}>
          Create Your Account
        </h2>

        {registerMutation.error || errorMessage ? (
          <Alert variant='danger'>
            {errorMessage || registerMutation.error?.response?.data?.message}
          </Alert>
        ) : (
          <></>
        )}
        <Form.Group controlId='validationCustom01' className='mb-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='John'
            variant='dark'
            onChange={(e) =>
              updateRegisterInfo({
                ...registerInfo,
                name: e.target.value,
              })
            }
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a Name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='validationCustom02' className='mb-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='john@gmail.com'
            onChange={(e) =>
              updateRegisterInfo({
                ...registerInfo,
                email: e.target.value,
              })
            }
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='validationCustom03' className='mb-5'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='password'
            onChange={(e) =>
              updateRegisterInfo({
                ...registerInfo,
                password: e.target.value,
              })
            }
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a strong password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className='mt-2 d-block w-100'
          variant='primary'
          type='submit'
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? 'Loading ...' : 'Sign Up'}
        </Button>
      </Form>

      <GoogleAuth mode='sign up' setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default Register;
