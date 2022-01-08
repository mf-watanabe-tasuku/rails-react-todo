import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 24px;
  margin-top: 50px;
`;

const LinkToHome = styled.div`
  text-align: center;
  margin-top: 30px;
  text-decoration: underline;
  color: #666;
`

function ErrorPage() {
  return (
    <>
      <ErrorMessage>Error! Page not found.</ErrorMessage>
      <Link to="/todos">
        <LinkToHome>Back to Top</LinkToHome>
      </Link>
    </>
  );
}

export default ErrorPage;
