import '@/styles/globals.sass'
import Layout from '../layouts/Layout'
import { QueryClient,  QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },})

export default function App({ Component, pageProps }) {
  return (
  <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <ReactQueryDevtools/>
  </QueryClientProvider>
  )
}