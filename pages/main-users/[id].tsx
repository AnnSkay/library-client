import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const { id } = router.query;

  const [userData, setUserData] = useState({});

  const getUserName = async () => {
    const response = await axios.post('http://localhost:3001/api/user', {
      id
    });

    setUserData(response.data);
  }  

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div>
      <HeadBlock title="Main Page" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={"/main-users/"}/>
          <MainGreeting name={userData.name} />
          <MainMenuUsers user={userData} page={"main"}/>
        </MainHeaderWrapper>

        <SearchForm/>
      </MainPageWrapper>
    </div>
  );
}
