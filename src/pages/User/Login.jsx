import React, {  } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Login() {
  const doLogin = () => {
    axios.post('http://localhost:4000/login', null, { params: { id: 'admin', password: 'admin0922' } })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Wrapper>
      <LoginBox>
        <LoginBoxHeader>C H A T T I N G</LoginBoxHeader>
        <LoginInputContainer>
          <LoginBoxInner>ID</LoginBoxInner>
          <LoginBoxInput type='text' id='id' />
        </LoginInputContainer>
        <LoginInputContainer>
          <LoginBoxInner>PASSWORD</LoginBoxInner>
          <LoginBoxInput type='password' id='password' />
        </LoginInputContainer>
        <LoginButton onClick={doLogin}>Click for login</LoginButton>
      </LoginBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  min-width: 360px;
  background-color: #191F2B;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  box-shadow: 0px 0px 20px 5px #191F2B;
`;

const LoginBoxHeader = styled.header`
  font-size: 1.5rem;
  color: white;
  text-shadow: 0px 0px 15px white;
  margin-bottom: 36px;
`;

const LoginInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
const LoginBoxInner = styled.span`
  font-size: 1rem;
  color: white;
  text-shadow: 0px 0px 10px white;
  flex-grow: 1;
  width: 90px;
  text-align: left;
`;
const LoginBoxInput = styled.input`
  min-width: 160px;
  min-height: 20px;
  padding: 4px;
  flex-grow: 2;
  box-shadow: 0px 0px 5px 1px white;
  border: 0px;
`;

const LoginButton = styled.button`
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 12px;
  margin-bottom: 4px;
  background-color: #4A5262;
  border: 0px;
  color: white;
  box-shadow: 0px 0px 5px 1px #4A5262;
  border-radius: 10px;
  cursor: pointer;
`;