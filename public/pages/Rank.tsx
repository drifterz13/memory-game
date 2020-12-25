import { styled } from "goober";
import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import Loading from "../components/Loading";
import { getRanks } from "../lib/api";

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

type Rank = {
  name: string;
  time_spent: number;
  created_at: string;
};

export default function Rank() {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    setFetching(true);
    getRanks()
      .then((data) => {
        setRanks(data.ranks);
        setFetching(false);
      })
      .catch((err) => {
        setError(err);
        setFetching(false);
      });
  }, []);

  if (fetching) return <Loading />;
  if (error) return <p>Something went wrong. {error}</p>;

  return (
    <RankPageContainer>
      <RankTable>
        <RankHeader>No.</RankHeader>
        <RankHeader>User 👤</RankHeader>
        <RankHeader>Time spent ⌛</RankHeader>
        <RankHeader>Date 📅</RankHeader>
        {ranks.map((rank, index) => {
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
