import React from "react";
import {HeadBlock} from '../../components/ui/head-block';
import {MainHeaderWrapper} from "../../components/ui/main-header-wrapper";
import {MainLogo} from "../../components/ui/main-logo";
import {MainGreeting} from "../../components/ui/main-greeting";
import {MainMenuUsers} from "../../components/ui/main-menu-users";
import {SearchForm} from "../../components/ui/search-form";
import {MainPageWrapper} from "../../components/ui/main-page-wrapper";
import { useRouter } from "next/router";

export default function MainUsersPage(): JSX.Element {
  const router = useRouter();
  const { name } = router.query;
  const role = 'USER';

  return (
    <div>
      <HeadBlock title="Main Page" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${name}`}/>
          <MainGreeting name={name} />
          <MainMenuUsers folder={role} page={"main"}/>
        </MainHeaderWrapper>

        <SearchForm/>
      </MainPageWrapper>
    </div>
  );
}
