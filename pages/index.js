// Nuxt Hooks
import Head from 'next/head';
// The Style (Module CSS)
import styles from '../styles/modules/Home.module.scss';
// React Hooks
import { useEffect } from 'react';
// Components
import Picture from '../components/Picture';
// Plugins
import axios from 'axios';

const Home = (props) => {
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

        <Picture width={100} />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
  const articles = await res.data;

  return {
    props: {
      articles
    }
  }
};
