import { createQuery } from "@tanstack/solid-query";
import { gql, request } from "graphql-request";
import { Title } from "solid-start";
import { QueryBoundary } from "~/components/query-boundary";

const endpoint = "https://graphqlzero.almansi.me/api";

export default function Test() {
  const query = createQuery(() => ({
    queryKey: ["posts"],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(
        endpoint,
        gql`
          query {
            posts(options: { slice: { limit: 1 } }) {
              data {
                id
                title
              }
            }
          }
        `
      );
      return data;
    },
  }));

  return (
    <main>
      <Title>Solid Query - Test</Title>

      <h1>Solid Query - Test</h1>

      <QueryBoundary
        loadingFallback={"loading..."}
        notFoundFallback={"not found"}
        query={query}
        errorFallback={"error"}
      >
        {(data) => <pre>{JSON.stringify(data, null, 2)}</pre>}
      </QueryBoundary>
    </main>
  );
}
