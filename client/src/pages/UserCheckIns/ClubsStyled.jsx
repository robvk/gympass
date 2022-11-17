import styled from "styled-components";

const Clubs = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  margin: 3rem 0 auto 0;
  min-height: 100vh;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .error {
    color: red;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
  }

  .loadingSpinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #000 transparent #555 transparent;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }

  .my-clubs-list {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
  .my-clubs-no-club-message {
    margin: 2rem;
    color: tomato;
    text-align: center;
    font-size: 14px;
  }

  @media only screen and (min-width: 900px) {
    .my-clubs-no-club-message {
      margin: 10rem;
      color: tomato;
      text-align: center;
      font-size: 24px;
    }
  }
`;

export default Clubs;
