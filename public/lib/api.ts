const graph = (window as any).graphql(
  "https://silly-brain.hasura.app/v1/graphql",
  {
    asJSON: true,
  }
);

export async function getRanks() {
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
  return graph(RanksQuery)();
}

export async function updateRank(variables: {
  rank: { name: string; time_spent: number };
}) {
  const RankMutation = `
    mutation($rank: ranks_insert_input!) {
      insert_ranks_one(object: $rank) {
        name
        time_spent
      }
    }
  `;
  return graph(RankMutation)(variables);
}
