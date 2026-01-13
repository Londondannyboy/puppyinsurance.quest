import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";

export default function Handler(props: { params: Promise<{ stack: string[] }> }) {
  if (!stackServerApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Auth Not Configured</h1>
          <p className="text-stone-400">Stack Auth environment variables are not set.</p>
        </div>
      </div>
    );
  }

  return <StackHandler fullPage app={stackServerApp} params={props.params} />;
}
