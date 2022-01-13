import Image from 'next/image';
import cn from 'classnames';
import styles from './styles.module.css';
import Image1 from './library-decoration-1.jpeg';
import Image2 from './library-decoration-2.jpeg';

export function AuthDescription() {
  return (
    <div className={styles.descBlock}>
      <h1 className={styles.descPhrase}>
        Библиотека — место встречи идей и людей
      </h1>

      <div className={cn(styles.image, styles.imageTop)}>
        <Image src={Image1} width={150} height={150} alt="" />
      </div>

      <div className={cn(styles.image, styles.imageBottom)}>
        <Image src={Image2} width={150} height={150} alt="" />
      </div>

      <div className={cn(styles.shadow, styles.shadowBig)} />
      <div className={cn(styles.shadow, styles.shadowNormal)} />
      <div className={cn(styles.shadow, styles.shadowSmallBottom)} />
      <div className={cn(styles.shadow, styles.shadowSmallTop)} />
    </div>
  );
}
