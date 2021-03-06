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
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState<string | undefined>('');

  const [searchingUserLastname, setSearchingUserLastname] = useState('');
  const [messageChange, setMessageChange] = useState('');

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

  const changeRole = async () => {
    await api
      .post('/users/change-role', {
        userId,
        userRole
      })
      .then((response) => {
        setMessageChange(response.data);
        getUsers();
      });
  };

  const deleteUser = async (id: number, login: string) => {
    if (confirm(`???? ??????????????, ?????? ???????????? ?????????????? ???????????????????????? "${login}"?`)) {
      await api
        .post('/users/delete-user', {
          id
        })
        .then((response) => {
          alert(response.data);
          getUsers();
        });
    }
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
        return '?????????????? ????????????????????????';
      case 'LIBR':
        return '????????????????????????';
      case 'ADMIN':
        return '??????????????????????????';
    }
  };

  const showPopup = (id: number, role: string | undefined) => {
    isShowPopupFrom(true);
    setUserRole(getRoleFormat(role));
    setUserId(String(id));
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
            ???????????????????? ????????????????????????????
          </h1>
          <MainMenuUsers user={userData} page="usersManagement"/>
        </MainHeaderWrapper>

        <div className={styles.listUsersBlock}>
          <div className={styles.searchBlock}>
            <label htmlFor="searchingUserLastname">
              ?????????? ???? ?????????????? ????????????????????????:
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
                alt="?????????? ????????????????????????"
              />
            </button>
          </div>

          <div className={styles.usersContainer}>
            {!(users.length === 0) ? (
              users &&
              users.map(({
                           id,
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
                      {(lastname + name) ? (lastname + ' ' + name) : '????????????????'}
                    </div>
                    <div><b>??????????:</b> {login}</div>
                    <div><b>????????:</b> {getRoleFormat(role)}</div>
                    <div><b>??????????????:</b> {phone}</div>

                    <div className={styles.buttonContainer}>
                      <button
                        type="button"
                        title="???????????????? ????????"
                        onClick={() => showPopup(id, role)}
                        className={styles.buttonImage}
                      >
                        <Image
                          src={ChangeRightsIcon}
                          width={30}
                          height={30}
                          alt="???????????????? ????????"
                        />
                      </button>

                      <button
                        type="button"
                        title="?????????????? ????????????????????????"
                        onClick={() => deleteUser(id, login)}
                        className={cn(styles.buttonImage, styles.buttonDeleteUser)}
                      >
                        <Image
                          src={DeleteUserIcon}
                          width={30}
                          height={30}
                          alt="?????????????? ????????????????????????"
                        />
                      </button>
                    </div>
                  </div>

                );
              })
            ) : (
               <div className={styles.nothingSearched}>
                 ?????? ?????????? ????????
               </div>
             )}
          </div>
        </div>
      </MainPageWrapper>

      <div className={showPopupClass()}>
        <div className={styles.popupForm}>
          <div className={styles.popupClose} onClick={hidePopup}/>
          <h2>?????????????????? ???????? ????????????????????????</h2>

          <select
            id="bookPublishHouse"
            name="publishHouse"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className={styles.inputRoleForm}
          >
            <option>
              ?????????????? ????????????????????????
            </option>
            <option>
              ????????????????????????
            </option>
            <option>
              ??????????????????????????
            </option>
          </select>

          <button
            type="submit"
            className={styles.buttonRoleForm}
            onClick={changeRole}
          >
            ???????????????? ????????
          </button>
          <div>{messageChange}</div>
        </div>

        <div className={styles.popupBlackout} onClick={hidePopup}/>
      </div>
    </div>
  );
}
