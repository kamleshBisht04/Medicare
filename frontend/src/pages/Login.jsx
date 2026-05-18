import { useState } from 'react';
import Input from '../components/Input';
import { assets } from '../assets/assets';

const initialData = {
  name: '',
  email: '',
  password: '',
};

const Login = () => {
  const [state, setState] = useState('Sign Up');

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex min-h-[80vh] items-center">
      <div className="m-auto flex min-w-[340px] flex-col items-start gap-4 rounded-xl border border-gray-100 p-8 text-sm text-zinc-600 shadow-lg sm:min-w-[28rem]">
        <img src={assets.logo} alt="" className='h-10 w-auto flex items-center justify-center' />
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>

        <p>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book
          appointment
        </p>

        {state === 'Sign Up' && (
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={true}
          />
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required={true}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
        />

        <button
          type="submit"
          className="bg-primary w-full rounded-md py-2 text-base text-white"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => {
                setState('Login');
                setFormData(initialData);
              }}
              className="text-primary cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => {
                setState('Sign Up');
                setFormData(initialData);
              }}
              className="text-primary cursor-pointer underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
