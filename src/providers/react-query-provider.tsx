"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
}

// const client = new QueryClient();

const ReactQueryProvider = ({children}: Props) => {
  const [client] = useState(() => new QueryClient()); // ✅ Created once per app lifecycle
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider