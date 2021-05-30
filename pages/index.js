// Nuxt Hooks
import Head from 'next/head';
// The Style (Module CSS)
import styles from '../styles/modules/Home.module.scss';
// React Hooks
import { useEffect } from 'react';
// Components
import Picture from '../components/Picture';
import ArticleList from '../components/ArticleList';
// Plugins
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import { fetchposts } from '../redux/actions/postAction';

const Home = (props) => {
  // 呼叫 actions 都一定要包在 dispatch function 裡面去執行
  const dispatch = useDispatch();

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

        <button onClick={ () => { dispatch(fetchposts()) } }>Action</button>

        <div className="picture-container">
          <img className={`picture-item ${styles.usagi}`} src="/img/kanahei.png" />
          <div className={`picture-item ${styles.piske}`} />
        </div>

        <Picture width={100} />

        <ArticleList articles={ props.articles } />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
    const articles = await res.data;

    return {
      props: {
        articles
      }
    }
  } catch (err) {
    console.log(err);
    return {
      props: {}
    }
  }
};
