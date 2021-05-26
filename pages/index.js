import Head from 'next/head';
import styles from '../styles/modules/Home.module.scss';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home Mounted');
  }, []);

  return (
    <div className="wrap">
      <Head>
        <title>Home</title>
      </Head>

      <h1>Welcome to Next.js Page</h1>
      <div className={`content ${styles.content}`}>
        <p>This is Home page</p>

        <div className="picture-container">
          <img className={`picture-item ${styles.usagi}`} src="/img/kanahei.png" />
          <div className={`picture-item ${styles.piske}`} />
        </div>
      </div>
    </div>
  );
};

export default Home;