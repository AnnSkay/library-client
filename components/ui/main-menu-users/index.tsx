import styles from "./styles.module.css";
import React, { useState } from "react";
import Image from "next/image";
import ListIcon from "./icon-list.png";
import CloseIcon from "./icon-close.png";
import cn from "classnames";
import { ListMenuReaders } from "../list-menu-readers";
import { ListMenuLibrarians } from "../list-menu-librarians";
import { ListMenuAdmins } from "../list-menu-admins";

export function MainMenuUsers({ folder}: { folder: string }): JSX.Element {
  const [showMenu,setShowMenu] = useState(false);

  const showListMenu = () => {
    !showMenu ? setShowMenu(true) : setShowMenu(false)
  }

  const menuListClass = () => cn(styles.menuList, styles.brown, {
    [styles.hideMenu]: !showMenu,
    [styles.white]: !showMenu,
  });

  const selectMenuList = () => {
    switch (folder) {
      case 'USER':
        return <ListMenuReaders/>
      case 'LIBR':
        return <ListMenuLibrarians/>
      case 'ADMIN':
        return <ListMenuAdmins/>
    }
  }

  return <div className={styles.menuBlock}>
    <div className={styles.menuTitle} onClick={showListMenu}>
      <Image src={!showMenu ? ListIcon: CloseIcon} width={24} height={24} alt="Открыть меню" />
    </div>

    <ul className={menuListClass()}>
      {selectMenuList()}
    </ul>
  </div>;
}
