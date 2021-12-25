import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { serialize, deserialize } from 'superjson';
import { SuperJSONResult } from 'superjson/dist/types';
import Link from 'next/link';
import { Deserialized } from '../typings';
import { display } from '../utils/display';

export const getServerSideProps: GetServerSideProps = async () => {
  const serialized = serialize({
    stringValue: 'static',
    dateValue: new Date('2022-01-01'),
    regexValue: /static/,
    undefinedValue: undefined,
    bigintValue: BigInt(9007199254740991),
    setValue: new Set([1, 2, 3]),
    mapValue: new Map([
      ['one', 1],
      ['two', 2],
      ['three', 3],
    ]),
    errorValue: new Error('error message!'),
  });
  return {
    props: {
      ssr: serialized,
    },
  };
};

type HomePageProps = {
  ssr: SuperJSONResult;
};

const Home: NextPage<HomePageProps> = ({ ssr }) => {
  const parsed = deserialize<Deserialized>(ssr);
  return (
    <div className={styles.container}>
      <Head>
        <title>swc-plugin-superjson-next Demo</title>
        <meta name="description" content="swc-plugin-superjson-next Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <br />
          <a href="https://github.com/DawChihLiou/swc-plugin-superjson-next">
            <code>swc-plugin-superjson-next</code>!
          </a>
        </h1>

        <h2>
          Deserialized props from <code>GetStaticProps</code>
        </h2>
        <code className={styles.code}>
          <ul>
            <li>String: {display(parsed.stringValue)}</li>
            <li>Date: {display(parsed.dateValue)}</li>
            <li>RegExp: {display(parsed.regexValue)}</li>
            <li>undefined: {display(parsed.undefinedValue)}</li>
            <li>BigInt: {display(parsed.bigintValue)}</li>
            <li>Set: {display(parsed.setValue)}</li>
            <li>Map: {display(parsed.mapValue)}</li>
            <li>Error: {display(parsed.errorValue?.toString())}</li>
          </ul>
        </code>

        <br />

        <Link href="/">
          <a href="/">
            👉 See swc-plugin-superjson-next in action with GetStaticProps.
          </a>
        </Link>
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
  );
};

export default Home;
