import type { NextPage } from 'next'
import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";

const Home: NextPage = () => {
  const [response, setResponse] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const {data} = await axios.post('http://localhost:3001/api/login', {
      login,
      password
    })
    setResponse(data)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next!</a>
        </h1>
        <input value={login} placeholder="login" onChange={e => setLogin(e.target.value)}/>
        <input value={password} placeholder="password"  onChange={e => setPassword(e.target.value)}/>
        <button onClick={handleLogin}>login please</button>
        <div>{response}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
