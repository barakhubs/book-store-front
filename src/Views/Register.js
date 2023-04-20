import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  async function registerRequest() {
    try {
      await fetch('http://localhost/api/auth/register.php', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      })
        .then((respose) => {
          if (respose.ok) {
            setEmail("");
            setPassword("");
            setUsername("");
            navigate('/');
            return respose.json()
          }
          throw new Error('error')
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
    registerRequest()
  }

  return (
    
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px]">
        <form onSubmit={submitHandler}>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full">
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username} onChange={usernameHandler}
                  placeholder="Username"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full">
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email} onChange={emailHandler}
                  placeholder="Email"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full">
              <div class="mb-5">
                <label
                  for="password"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Password
                </label>
                <input
                  type="password" value={password} onChange={passwordHandler}
                  placeholder="Password"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}