import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/router';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainGreeting } from '../../components/ui/main-greeting';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { SearchForm } from '../../components/ui/search-form';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';

export default function MainUsersPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData]: any = useState({});

  const getUserName = async () => {
    await api
      .post('/user', {
        id
      }).then ((response) => {
        if (response.data.name === '') {
          response.data.name = 'Читатель';
        }
        setUserData(response.data);
      });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserName();
  }, [id]);

  return (
    <div>
      <HeadBlock title="Main Page" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${userData.id}`} />
          <MainGreeting name={userData.name} />
          <MainMenuUsers user={userData} page="main" />
        </MainHeaderWrapper>

        <SearchForm id={id} />
      </MainPageWrapper>
    </div>
  );
}
