import { useRouter } from 'next/router';
import styles from '../styles/modules/components/Card.module.scss';
import { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

const ArticleItem = ({ article = {} }) => {
  const router = useRouter();

  // 要取得 Redux State 的資料，需要使用 useSelector
  const post = useSelector(state => state.post);

  // 要做到類似 Vue 的 computed / watch 的功能，可以使用 useEffect
  // 因為 React 的 Virtual DOM 每次都會全部更新，所以 useEffect 可以做到 deep watch
  useEffect(() => {
    // console.log(post);
  }, [post]);

  return (
    <a
      href=""
      className={ styles.card }
      onClick={
        (e) => {
          e.preventDefault();
          router.push({
            pathname: '/article/[id]',
            query: { id: article.id }
          });
        }
      }
    >
      <h3 className={ styles.card__title }>{ article.title }</h3>
      <div className={ styles.card__body }>
        <p>{ article.body }</p>
        <p>{ post.posts.map(item => item).join(', ') }</p>
      </div>
    </a>
  )
};

export default ArticleItem;