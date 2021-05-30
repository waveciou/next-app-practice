import '../styles/main.scss'
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

// Redux
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';

const App = ({ Component, pageProps }) => {
  const [ scrollValue, setScrollValue ] = useState(0);
  const [ screenWidth, setScreenWidth ] = useState(0);

  // 取得 Scroll Value
  const getScrollHandler = () => {
    const value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    setScrollValue(value);
  };

  // 取得瀏覽器寬度
  const getScreenWidthHandler = () => {
    const value = window.innerWidth;
    setScreenWidth(value);
  };

  useEffect(() => {
    console.log('APP Mounted');
    window.addEventListener('scroll', getScrollHandler);
    window.addEventListener('resize', getScreenWidthHandler);

    return () => {
      console.log('APP Destroyed');
      window.removeEventListener('scroll', getScrollHandler);
      window.removeEventListener('scroll', getScreenWidthHandler);
    }
  }, []);

  return (
    <Provider store={ store }>
      <Layout>
        <Component {...pageProps} scrollValue={scrollValue} screenWidth={screenWidth} />
      </Layout>
    </Provider>
  )
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);