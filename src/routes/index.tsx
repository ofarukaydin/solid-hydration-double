import { createQuery } from "@tanstack/solid-query";
import { gql, request } from "graphql-request";
import { Suspense, Switch, Match } from "solid-js";
import { Title } from "solid-start";

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

      {/* // The commented code below works */}
      {/* <Suspense fallback={"loading"}>
        <pre>
          <code>{JSON.stringify(query.data, null, 2)}</code>
        </pre>
      </Suspense> */}

      {/* // The code below does not work, double rendering bug happens in switch match */}
      <Suspense fallback={"loading"}>
        <Switch>
          <Match when={query.isError}>
            <div>{query.error?.message}</div>
          </Match>

          <Match when={!query.isFetching && !query.data}>
            <div>not found</div>
          </Match>

          <Match when={query.data}>
            <pre>
              <code>{JSON.stringify(query.data, null, 2)}</code>
            </pre>
          </Match>
        </Switch>
      </Suspense>
    </main>
  );
}
