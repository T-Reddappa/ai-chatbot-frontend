import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 15px 20px;
  text-align: center;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        © {new Date().getFullYear()} Movie Character Chat. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
