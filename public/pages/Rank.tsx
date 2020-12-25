import { useQuery } from "@urql/preact";
import { styled } from "goober";
import { Fragment } from "preact";
import Loading from "../components/Loading";

const RankPageContainer = styled("div")`
  width: 660px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 1em;
  background: white;

  @media only screen and (max-width: 768px) {
    width: 330px;
  }
`;

const RankTable = styled("div")`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr;
`;

const RankHeader = styled("div")`
  padding: 1em;
  font-size: larger;
  text-align: center;
  background: cornflowerblue;
  font-weight: bold;

  border-top: 2px solid;
  border-bottom: 2px solid;
  border-right: 2px solid;

  &:nth-of-type(1) {
    border: 2px solid;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    font-size: large;
  }
`;

const RankItem = styled("div")`
  padding: 1em;
  background: aliceblue;
  border-bottom: 2px solid;
  border-right: 2px solid;
  display: grid;
  place-items: center;

  &:nth-of-type(4n + 1) {
    border-left: 2px solid;
    border-bottom: 2px solid;
    border-right: 2px solid;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

const RanksQuery = `
  query {
    ranks (order_by:{ time_spent: asc }, limit: 10) {
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

  if (fetching) return <Loading />;
  if (error) return <p>Something went wrong. {error}</p>;
  return (
    <RankPageContainer>
      <RankTable>
        <RankHeader>No.</RankHeader>
        <RankHeader>User 👤</RankHeader>
        <RankHeader>Time spent ⌛</RankHeader>
        <RankHeader>Date 📅</RankHeader>
        {data.ranks.map((rank, index) => {
          return (
            <Fragment>
              <RankItem>{index + 1}</RankItem>
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
