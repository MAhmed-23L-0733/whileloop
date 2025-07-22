"use client";
import styled from "styled-components";

const Checkbox = ({ check, setCheck }) => {
  return (
    <StyledWrapper>
      <label className="bar" htmlFor="check">
        <input
          type="checkbox"
          id="check"
          checked={check}
          onChange={() => {
            setCheck(!check);
          }}
        />
        <span className="top" />
        <span className="middle" />
        <span className="bottom" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  input[type="checkbox"] {
    -webkit-appearance: none;
    display: none;
    visibility: hidden;
  }

  .bar {
    display: block;
    position: relative;
    cursor: pointer;
    width: 30px;
    height: 20px;
  }

  .bar span {
    position: absolute;
    width: 30px;
    height: 3px;
    background: #f1faee;
    border-radius: 100px;
    display: inline-block;
    transition: 0.3s ease;
    left: 0;
  }

  .bar span.top {
    top: 0;
  }

  .bar span.middle {
    top: 9px;
  }

  .bar span.bottom {
    bottom: 0;
  }

  input[type]:checked ~ span.top {
    transform: rotate(45deg);
    transform-origin: top left;
    width: 30px;
    left: 14px;
  }

  input[type]:checked ~ span.bottom {
    transform: rotate(-45deg);
    transform-origin: top left;
    width: 30px;
    bottom: -4px;
    left: 11px;
    box-shadow: 0 0 10px #495057;
  }

  input[type]:checked ~ span.middle {
    opacity: 0;
  }
`;

export default Checkbox;
