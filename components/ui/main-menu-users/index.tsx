import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import styles from './styles.module.css';
import ListIcon from './icon-list.png';
import CloseIcon from './icon-close.png';
import { ListMenuLibrarians } from '../list-menu-librarians';
import { ListMenuAdmins } from '../list-menu-admins';

export function MainMenuUsers({
                                user,
                                page
                              }: { user: { id: number; role: string }, page: string }): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);

  const showListMenu = () => {
    !showMenu ? setShowMenu(true) : setShowMenu(false);
  };

  const menuListClass = () => cn(styles.menuList, styles.brown, {
    [styles.hideMenu]: !showMenu,
    [styles.white]: !showMenu
  });

  const selectMenuList = () => {
    switch (user.role) {
      case 'LIBR':
        return <ListMenuLibrarians page={page} user={user}/>;
      case 'ADMIN':
        return <ListMenuAdmins page={page} user={user}/>;
    }
  };

  const linkClass = (linkName: string) => cn(styles.link, {
    [styles.linkActive]: page === 'personalAccount' && linkName === 'personalAccount' ||
                         page === 'myBooks' && linkName === 'myBooks'
  });

  return (
    <div className={styles.menuBlock}>
      <div className={styles.menuTitle} onClick={showListMenu}>
        <Image
          src={!showMenu ? ListIcon : CloseIcon}
          width={24}
          height={24}
          alt="Открыть меню"
        />
      </div>

      <ul className={menuListClass()}>
        <li className={styles.li}>
          <Link href={`/personal-account/${user.id}`}>
            <a className={linkClass('personalAccount')}>
              Личный кабинет
            </a>
          </Link>
        </li>

        <li className={styles.li}>
          <Link href={`/my-books/${user.id}`}>
            <a className={linkClass('myBooks')}>
              Мои книги
            </a>
          </Link>
        </li>

        {selectMenuList()}

        <li className={styles.li}>
          <Link href="/">
            <a className={styles.link}>
              Выйти
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
