import styles from '../styles/modules/components/Card.module.scss';

const ArticleItem = ({ article = {} }) => {
  return (
    <div className={ styles.card }>
      <h3 className={ styles.card__title }>{ article.title }</h3>
      <div className={ styles.card__body }>
        <p>{ article.body }</p>
      </div>
    </div>
  )
};

export default ArticleItem;