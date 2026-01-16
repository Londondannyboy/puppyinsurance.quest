'use client';

import { CopilotKit } from '@copilotkit/react-core';

// CopilotKit runtime connects to Railway Pydantic AI agent via AG-UI protocol
// The agent named "atlas" handles all HITL tool calls
const RUNTIME_URL = '/api/copilotkit';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl={RUNTIME_URL} agent="atlas">
      {children}
    </CopilotKit>
  );
}
