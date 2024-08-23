// src/components/Loading3D.js
'use client'
import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34; /* Dark background for contrast */
`;

const Cube = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(30deg) rotateY(30deg);
  animation: spin 2s infinite linear;

  @keyframes spin {
    from {
      transform: rotateX(0deg) rotateY(0deg);
    }
    to {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }
`;

const Face = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: #DDA32E; /* Gradient effect */
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px; /* Rounded corners for a modern look */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  &:nth-child(1) { transform: rotateY(0deg) translateZ(50px); }
  &:nth-child(2) { transform: rotateY(90deg) translateZ(50px); }
  &:nth-child(3) { transform: rotateY(180deg) translateZ(50px); }
  &:nth-child(4) { transform: rotateY(270deg) translateZ(50px); }
  &:nth-child(5) { transform: rotateX(90deg) translateZ(50px); }
  &:nth-child(6) { transform: rotateX(-90deg) translateZ(50px); }
`;

const Loading3D = () => {
  return (
    <LoaderContainer>
      <Cube>
        <Face>Loading...</Face>
        <Face></Face>
        <Face></Face>
        <Face></Face>
        <Face></Face>
        <Face></Face>
      </Cube>
    </LoaderContainer>
  );
};

export default Loading3D;
