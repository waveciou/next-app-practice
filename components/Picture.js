import styles from '../styles/modules/components/Picture.module.scss';
import { useEffect } from 'react';

const Picture = (props) => {
  useEffect(() => {
    console.log('Picture Mounted');
    console.log(props.width);
  }, []);

  // Img Tag 的 src 是依照 public 資料夾為準的相對路徑

  return (
    <div className="picture-container">
      <img className={`picture-item ${styles.usagi}`} src="/img/kanahei.png" />
      <div className={`picture-item ${styles.piske}`} />
    </div>
  )
};

export default Picture;