import '../styles/main.scss'
import Layout from '../components/Layout';
import { useEffect } from 'react';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    console.log('APP Mounted');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
};

export default App
