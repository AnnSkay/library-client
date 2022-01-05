import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import styles from './styles.module.css';
import ListIcon from './icon-list.png';
import CloseIcon from './icon-close.png';
import { ListMenuReaders } from '../list-menu-readers';
import { ListMenuLibrarians } from '../list-menu-librarians';
import { ListMenuAdmins } from '../list-menu-admins';

export function MainMenuUsers({ user, page }: { user: any, page: string }): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);

  const showListMenu = () => {
    !showMenu ? setShowMenu(true) : setShowMenu(false)
  }

  const menuListClass = () => cn(styles.menuList, styles.brown, {
    [styles.hideMenu]: !showMenu,
    [styles.white]: !showMenu,
  });

  const selectMenuList = () => {
    switch (user.role) {
      case 'USER':
        return <ListMenuReaders user={user} page={page} />
      case 'LIBR':
        return <ListMenuLibrarians />
      case 'ADMIN':
        return <ListMenuAdmins />
      default:
        return <ListMenuReaders user={user} page={page} />
    }
  }

  const linkClass = (linkName: string) => cn(styles.link, {
    [styles.linkActive]: page === 'persAcc' && linkName === 'persAcc',
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
            <a className={linkClass('persAcc')}>
              Личный кабинет
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
