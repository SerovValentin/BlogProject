import { Routes, Route } from "react-router";
import { Header, Footer, Error } from "./components";
import { Authorization, Main, Post, Registration, Users } from "./pages";
import { ERROR } from "./constants";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./action";
import { Modal } from "./components";
import styled from "styled-components";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
`;

const Page = styled.div`
  padding: 120px 0 20px;
`;

function Blog() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<Post />} />
          <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColumn>
  );
}

export default Blog;
