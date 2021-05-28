import { useRouter } from 'next/router'; 
import styles from '../styles/modules/components/Card.module.scss';

const ArticleItem = ({ article = {} }) => {
  const router = useRouter();

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
      </div>
    </a>
  )
};

export default ArticleItem;