import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

const Article = ({ article }) => {
  const router = useRouter();
  // router.query.id 可以取得巢狀路由的參數（網址上的子路由名稱）
  const { id } = router.query;

  return (
    <div className="wrap">
      <Head>
        <title>{ `${article.title}` }</title>
      </Head>

      <h1>{ `${article.title}` }</h1>
      <div className="content">
        <p>{ `${article.body}` }</p>
      </div>
    </div>
  )
};

export const getServerSideProps = async (context) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
  const article = await res.data;

  return {
    props: {
      article
    }
  }
};

export default Article;