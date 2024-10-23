import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NotFoundBlock from '../../../Errors/NotFoundBlock';

export const StyledLoader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
`;

export const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
  height: 108px;
  background-color: red;
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
`;

export const StyledErrorHeader = styled.h2`
  font-size: 24px;
  margin: 0;
  padding-left: 16px;
  color: white;
`;

export const StyledErrorText = styled.p`
  font-size: 16px;
  margin: 0;
  padding-left: 16px;
  color: white;
`;

export const StyledErrorLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  color: #6534ff;
`;

export const StyledNotFoundBlock = styled(NotFoundBlock)`
  width: 100%;
  height: 0;
`;