import styles from '../styles/modules/Layout.module.scss';
import Menu from './Menu';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  useEffect(() => {
    console.log('Layout Mounted');
  }, []);

  return (
    <div>
      <Menu />
      <main className={styles.container}>
        { children }
      </main>
    </div>
  );
};

export default Layout;