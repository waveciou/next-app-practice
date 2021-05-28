import Head from 'next/head';
import { useRouter } from 'next/router';

const Article = () => {
  const router = useRouter();
  // router.query.id 可以取得巢狀路由的參數（網址上的子路由名稱）
  const { id } = router.query;

  return (
    <div className="wrap">
      <Head>
        <title>{ `Article ${id}` }</title>
      </Head>

      <h1>{ `Article Page ${id}` }</h1>
      <div className="content">
        <p>This is Article Page</p>
      </div>
    </div>
  )
};

export default Article;