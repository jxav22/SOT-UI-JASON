import React from 'react'

type Props = {}

function Form({ }: Props) {
    return (
        <form>
            <ul>
                <li>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id='firstname' name='firstname' required />
                </li>
                <li>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id='lastname' name='lastname' required />
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' required />
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' required />
                </li>
            </ul>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form