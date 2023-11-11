// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

export default function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5000,
      },
    },
  });
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <ErrorBoundary>
              <A href="/">Index</A>
              <A href="/about">About</A>
              <A href="/test">Test</A>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </QueryClientProvider>
      </Body>
    </Html>
  );
}
