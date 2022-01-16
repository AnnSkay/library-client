import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { HeadBlock } from '../components/ui/head-block';
import { MainPageWrapper } from '../components/ui/main-page-wrapper';
import NotFoundImage from './not-found-image.png';
import Link from 'next/link';

export default function Custom404(): JSX.Element {
  return (
    <div>
      <HeadBlock title="Не найдена"/>

      <MainPageWrapper>
        <div className={styles.flexBox}>
          <div className={styles.textBlock}>
            <div className={styles.ohText}>
              Ой!
            </div>

            <div className={styles.apologiesText}>
              Похоже, мы не<br/>
              можем найти<br/>
              нужную вам <br/>
              страницу.
            </div>

            <div className={styles.errorCode}>
              Код ошибки: 404
            </div>

            <div className={styles.offerText}>
              Предлагаем вернуться на главную страницу:<br/>
              <Link href="/">
                <a className={styles.linkToMain}>
                  Главная
                </a>
              </Link>
            </div>
          </div>

          <div>
            <Image
              src={NotFoundImage}
              width={500}
              height={500}
              alt="Редактировать книгу"
            />
          </div>
        </div>
      </MainPageWrapper>
    </div>
  );
}
