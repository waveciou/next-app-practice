import Link from 'next/link';
import styles from '../styles/modules/Menu.module.scss';
import { useRouter } from 'next/router';

const Menu = () => {
  // useRouter 可以取得目前的頁面資訊
  const router = useRouter();

  const classNameLinkBtn = (pathName) => {
    return `${styles.menuLink} ${router.asPath === pathName ? styles.current : ''}`
  };

  return (
    <nav id={styles.menu}>
      <ul className={styles.menuList}>
        <li>
          <Link href="/">
            <a className={classNameLinkBtn('/')}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={classNameLinkBtn('/about')}>About</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;