import styled from 'styled-components';

export const Form = styled.form``;

export const TextInput = styled.input.attrs({
  type: 'text',
})`
  margin-right: 10px;
  width: 300px;
`;

export const ErrorMsg = styled.p`
  color: #f44336;
  white-space: pre;
`;
