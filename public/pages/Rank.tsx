import { useQuery } from "@urql/preact";
import { styled } from "goober";
import { Fragment } from "preact";

const RankPageContainer = styled("div")`
  width: 660px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 1em;
  background: white;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const RankTable = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const RankHeader = styled("div")`
  padding: 1em;
  font-size: larger;
  text-align: center;
  background: cornflowerblue;
  font-weight: bold;
  width: 220px;

  border-top: 2px solid;
  border-bottom: 2px solid;
  border-right: 2px solid;

  &:nth-of-type(1) {
    border: 2px solid;
  }

  @media only screen and (max-width: 768px) {
    width: 100px;
    padding: 0.25em;
    font-size: large;
  }
`;

const RankItem = styled("div")`
  padding: 1em;
  width: 220px;
  background: aliceblue;
  border-bottom: 2px solid;
  border-right: 2px solid;
  text-align: center;

  &:nth-of-type(3n + 1) {
    border-left: 2px solid;
    border-bottom: 2px solid;
    border-right: 2px solid;
  }

  @media only screen and (max-width: 768px) {
    width: 100px;
    padding: 0.25em;
  }
`;

const RanksQuery = `
  query {
    ranks {
      id
      name
      created_at
      time_spent
    }
  }
`;

export default function Rank() {
  const [result] = useQuery({
    query: RanksQuery,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading ...</p>;
  if (error) return <p>Something went wrong. {error}</p>;
  return (
    <RankPageContainer>
      <RankTable>
        <RankHeader>User 👤</RankHeader>
        <RankHeader>Time spent ⌛</RankHeader>
        <RankHeader>Date 📅</RankHeader>
        {data.ranks.map((rank) => {
          return (
            <Fragment>
              <RankItem>{rank.name}</RankItem>
              <RankItem>{rank.time_spent}s</RankItem>
              <RankItem>{getFormatDate(rank.created_at)}</RankItem>
            </Fragment>
          );
        })}
      </RankTable>
    </RankPageContainer>
  );
}

function getFormatDate(date: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date(date);

  return `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}`;
}
