import type { NextPage } from 'next'
import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Главная страница</title>
      </Head>

      <main>
        <h1>
          Добро пожаловать в библиотеку мечты!
        </h1>
      </main>
      
    </div>
  )
}

export default Home
