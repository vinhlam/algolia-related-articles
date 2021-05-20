import styled from "styled-components";

export const AppWrapper = styled.div`
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  font-size: 12px;

  .form {
    display: flex;
    flex-direction: column;
    width: 600px;

    > div {
      display: flex;
      justify-content: space-between;
      margin: 2px;
      span {
        font-weight: bold;
      }
    }
    input {
      width: 500px;
    }
    button {
      margin: 5px;
      align-self: flex-end;
    }
  }
`;

export const ArticleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .article {
    border: 1px black solid;
    padding: 10px;
    margin: 10px;
    width: 320px;
    height: 360px;
    overflow: scroll;
    .headline {
      font-size: 16px;
      a,
      a:visited {
        color: inherit;
        text-decoration: none;
      }
    }
    .section {
      color: #500;
    }
    .topics {
      color: #050;
    }
    .labels {
      color: #540;
    }
    .keywords {
      color: #005;
    }
    .byline {
      color: #055;
    }
    .image {
      justify-content: center;
      display: flex;
      img {
        width: 300px;
      }
    }
  }
`;