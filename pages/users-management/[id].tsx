import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import api from '../../services/api';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';
import cn from 'classnames';
import Image from 'next/image';
import SearchUserIcon from './icon-search-user.png';
import DeleteUserIcon from './icon-delete-user.png';
import ChangeRightsIcon from './icon-change-rights-user.png';

export default function UsersManagementPage(): JSX.Element {
  interface UserDataType {
    id: number;
    name: string;
    lastname: string;
    login: string;
    password: string;
    role: string;
    phone: string;
  }

  const router = useRouter();
  const {id} = router.query;

  const [userData, setUserData] = useState<UserDataType>({
    id: 0,
    name: '',
    lastname: '',
    login: '',
    password: '',
    role: '',
    phone: ''
  });

  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState<string | undefined>('');

  const [searchingUserLastname, setSearchingUserLastname] = useState('');

  const [showPopupForm, isShowPopupFrom] = useState(false);

  const getUserData = async () => {
    await api
      .post('/users/user-data', {
        id
      })
      .then((response) => {
        if (response.data === 'no user') {
          Router.push(`/404.tsx`);
        }
        setUserData(response.data);
      });
  };

  const getUsers = async () => {
    await api
      .get('/users/allUsers')
      .then((response) => {
        setUsers(response.data);
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
    getUsers();
  }, [id]);

  const getRoleFormat = (role: string | undefined) => {
    switch (role) {
      case 'USER':
        return 'Обычный пользователь';
      case 'LIBR':
        return 'Библиотекарь';
      case 'ADMIN':
        return 'Администратор';
    }
  };

  const showPopup = (role: string | undefined) => {
    isShowPopupFrom(true);
    setUserRole(getRoleFormat(role));
  };

  const hidePopup = () => isShowPopupFrom(false);

  const showPopupClass = () => cn(styles.popupBlock, {
    [styles.popupOpened]: showPopupForm
  });

  return (
    <div>
      <HeadBlock title="Users management"/>

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${id}`}/>
          <h1 className={styles.headerTitle}>
            Управление пользователями
          </h1>
          <MainMenuUsers user={userData} page="usersManagement"/>
        </MainHeaderWrapper>

        <div className={styles.listUsersBlock}>
          <div className={styles.searchBlock}>
            <label htmlFor="searchingUserLastname">
              Поиск по фамилии пользователя:
            </label>

            <input
              type="text"
              id="searchingUserLastname"
              name="searchingUserLastname"
              value={searchingUserLastname}
              onChange={(e) => setSearchingUserLastname(e.target.value)}
              className={styles.input}
            />

            <button
              type="button"
              // onClick={getUsersByLastname}
              className={styles.buttonSearch}
            >
              <Image
                src={SearchUserIcon}
                width={30}
                height={30}
                alt="Поиск пользователя"
              />
            </button>
          </div>

          <div className={styles.usersContainer}>
            {!(users.length === 0) ? (
              users &&
              users.map(({
                           name,
                           lastname,
                           login,
                           role,
                           phone
                         }, index) => {
                return (
                  <div
                    className={styles.user}
                    key={index}
                  >
                    <div className={styles.userTitle}>
                      {(lastname + name) ? (lastname + ' ' + name) : 'Читатель'}
                    </div>
                    <div><b>Почта:</b> {login}</div>
                    <div><b>Роль:</b> {getRoleFormat(role)}</div>
                    <div><b>Телефон:</b> {phone}</div>

                    <div className={styles.buttonContainer}>
                      <button
                        type="button"
                        title="Изменить роль"
                        onClick={() => showPopup(role)}
                        className={styles.buttonImage}
                      >
                        <Image
                          src={ChangeRightsIcon}
                          width={30}
                          height={30}
                          alt="Изменить роль"
                        />
                      </button>

                      <button
                        type="button"
                        title="Удалить пользователя"
                        // onClick={}
                        className={cn(styles.buttonImage, styles.buttonDeleteUser)}
                      >
                        <Image
                          src={DeleteUserIcon}
                          width={30}
                          height={30}
                          alt="Удалить пользователя"
                        />
                      </button>
                    </div>
                  </div>

                );
              })
            ) : (
               <div className={styles.nothingSearched}>
                 Нет таких книг
               </div>
             )}
          </div>
        </div>
      </MainPageWrapper>

      <div className={showPopupClass()}>
        <div className={styles.popupForm}>
          <div className={styles.popupClose} onClick={hidePopup}/>
          <h2>Изменение роли пользователя</h2>

          <select
            id="bookPublishHouse"
            name="publishHouse"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className={styles.inputRoleForm}
          >
            <option>
              Обычный пользователь
            </option>
            <option>
              Библиотекарь
            </option>
            <option>
              Администратор
            </option>
          </select>

          <button
            type="submit"
            className={styles.buttonRoleForm}
            // onClick={changeRole}
          >
            Изменить роль
          </button>
        </div>

        <div className={styles.popupBlackout} onClick={hidePopup}/>
      </div>
    </div>
  );
}
