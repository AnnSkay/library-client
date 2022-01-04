import React from 'react';
import { HeadBlock } from '../components/ui/head-block';
import { MainHeaderWrapper } from '../components/ui/main-header-wrapper';
import { MainLogo } from '../components/ui/main-logo';
import { MainGreeting } from '../components/ui/main-greeting';
import { LoginToAccountLink } from '../components/ui/login-to-account-link';
import { SearchForm } from '../components/ui/search-form';
import { MainPageWrapper } from '../components/ui/main-page-wrapper';

export default (): JSX.Element => {
  return (
    <div>
      <HeadBlock title="Main Page" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={'/'}/>

          <MainGreeting name="Гость" />

          <LoginToAccountLink />
        </MainHeaderWrapper>

        <SearchForm id={'гость'} />
      </MainPageWrapper>
    </div>
  );
}
