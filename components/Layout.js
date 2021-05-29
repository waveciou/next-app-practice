import styles from '../styles/modules/Layout.module.scss';
import Menu from './Menu';
import Meta from './Meta';
import { useEffect } from 'react';

// Head Meta 若要模組化共用，可以放在 Layout 這一層

const Layout = ({ children }) => {
  useEffect(() => {
    console.log('Layout Mounted');
  }, []);

  return (
    <div className="__layout">
      <Meta />
      <Menu />
      <main className={styles.container}>
        { children }
      </main>
    </div>
  );
};

export default Layout;