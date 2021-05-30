import '../styles/main.scss'
import Layout from '../components/Layout';
import { useEffect } from 'react';

// Redux
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    console.log('APP Mounted');
  }, []);

  return (
    <Provider store={ store }>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);