import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Chat from './chat'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Chat with GPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center scrollbar">
        <h1 className="text-6xl font-bold">
          Chat with GPT
        </h1>
        <Chat />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home