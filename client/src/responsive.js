import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 426px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 770px) and (min-width: 427px) {
      ${props}
    }
  `;
};
