import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState({ text: '', display: 'none' });

  const doRegister = () => {
    const idElement = document.getElementById('id');
    const passwordElement = document.getElementById('password');
    const nameElement = document.getElementById('name');

    const id = idElement.value;
    const password = passwordElement.value;
    const name = nameElement.value;

    if(!(!!id)) {
      setErrorText({ text: '아이디를 입력해주세요.', display: 'block' }); idElement.focus(); return;
    } else if(!(!!password)) {
      setErrorText({ text: '비밀번호를 입력해주세요.', display: 'block' }); passwordElement.focus(); return;
    } else if(!(!!name)) {
      setErrorText({ text: '이름을 입력해주세요.', display: 'block' }); nameElement.focus(); return;
    }

    axios.post('http://localhost:4000/register', null, { params: { id: id, password: password, name: name } })
    .then(res => {
      setErrorText({ text: '', display: 'none' });
      if(res.status === 200) {
        alert('회원가입 성공!');
        navigate('/login');
      }
    })
    .catch(err => {
      if(err.response.status === 409 && err.response.data === 'DUP_ID') {
        setErrorText({ text: '중복된 ID입니다.', display: 'block' });
        idElement.focus();
      } else {
        alert('예기치 못한 서버 오류가 발생하였습니다.')
      }
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
        <LoginInputContainer>
          <LoginBoxInner>NAME</LoginBoxInner>
          <LoginBoxInput type='text' id='name' />
        </LoginInputContainer>
        <ErrorText display={errorText.display}>{errorText.text}</ErrorText>
        <LoginButton onClick={doRegister}>Click for register</LoginButton>
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

const ErrorText = styled.span`
  color: #d22e2e;
  font-size: 0.8rem;
  display: ${(props) => props.display};
`;