import ArticleItem from './ArticleItem';

const ArticleList = ({ articles = [] }) => {
  const ulletedStyles = {
    marginTop: '3rem',
    marginBottom: '3rem'
  };

  const listStyles = {
    marginTop: '1rem',
    marginBottom: '1rem'
  };

  return (
    <ul className="articleList" style={ ulletedStyles }>
      {
        articles.map(article => {
          return (
            <li key={ article.id } style={ listStyles }>
              <ArticleItem article={ article } />
            </li>
          )
        })
      }
    </ul>
  )
};

export default ArticleList;