import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add state for error handling
  console.log(localStorage.getItem('username'));

  const emailHandler = (event) => {
    setEmail(event.target.value);
    setError(null); // Reset error when email input changes
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    setError(null); // Reset error when password input changes
  };

  const submitHandler = async (event) => { // Use async/await for better error handling
    event.preventDefault();
    try {
      const response = await fetch('http://localhost/api/auth/login.php', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('username', data.username);
          navigate('/');
          window.location.reload();
        } else {
          setError('Invalid email or password'); // Set error message when token is not present in response
        }
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred'); // Set error message for non-200 response status
      }
    } catch (error) {
      setError('An error occurred'); // Set error message for network or other errors
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={submitHandler}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={emailHandler}
                  placeholder="Email"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={passwordHandler}
                  placeholder="Password"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 mb-5">{error}</div> // Render error message when error state is not null
          )}

          <div>
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}