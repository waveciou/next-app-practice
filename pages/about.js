import Head from 'next/head';
import styles from '../styles/modules/About.module.scss';
import { useEffect } from 'react';

const about = ({ title }) => {
  useEffect(() => {
    console.log('About Mounted');
  }, []);

  return (
    <div className="wrap">
      <Head>
        <title>{title}</title>
      </Head>

      <h1>About Page</h1>
      <div className={`content ${styles.content}`}>
        <p>This is About page</p>
      </div>
    </div>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      title: 'About'
    }
  }
}

export default about;