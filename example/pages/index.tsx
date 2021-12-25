import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

import { display } from '../utils/display';
import { Deserialized } from '../typings';

export const getStaticProps: GetStaticProps<Record<
  'statics',
  Deserialized
>> = async () => {
  const serialized = {
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
  };
  return {
    props: {
      statics: serialized,
    },
  };
};

type HomePageProps = {
  statics: Deserialized;
};

const Home: NextPage<HomePageProps> = ({ statics }) => {
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
            <li>String: {display(statics.stringValue)}</li>
            <li>Date: {display(statics.dateValue)}</li>
            <li>RegExp: {display(statics.regexValue)}</li>
            <li>undefined: {display(statics.undefinedValue)}</li>
            <li>BigInt: {display(statics.bigintValue)}</li>
            <li>Set: {display(statics.setValue)}</li>
            <li>Map: {display(statics.mapValue)}</li>
            <li>Error: {display(statics.errorValue?.toString())}</li>
          </ul>
        </code>

        <br />

        <Link href="/ssr">
          <a href="/ssr">
            👉 See swc-plugin-superjson-next in action with GetServerSideProps.
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
