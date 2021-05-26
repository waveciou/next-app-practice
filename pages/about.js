import Head from 'next/head';
import styles from '../styles/modules/About.module.scss';

const about = () => {
  return (
    <div className="wrap">
      <Head>
        <title>About</title>
      </Head>

      <h1>About Page</h1>
      <div className={`content ${styles.content}`}>
        <p>This is About page</p>
      </div>
    </div>
  );
};

export default about;