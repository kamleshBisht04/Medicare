import { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex min-h-[80vh] items-center">
      <div className="m-auto flex min-w-[340px] flex-col items-start gap-3 rounded-xl border border-gray-100 p-8 text-sm text-zinc-600 shadow-lg sm:min-w-96">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book
          appointment
        </p>
        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="mt-1 w-full rounded border border-zinc-300 p-2"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="mt-1 w-full rounded border border-zinc-300 p-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="mt-1 w-full rounded border border-zinc-300 p-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
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
              onClick={() => setState('Login')}
              className="text-primary cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-primary cursor-pointer underline"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
