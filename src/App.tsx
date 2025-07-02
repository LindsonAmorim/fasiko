import { AboutMethodDialog } from "@/components/about-method-dialog";
import { MotivationalQuote } from "@/components/motivational-quote";
import { Timer } from "@/components/timer";
import { FocusPriorities } from "@/components/todo-list";

export default function App() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center  p-4 antialiased">
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg">
        <FocusPriorities />
        <Timer />
        <AboutMethodDialog />
        <MotivationalQuote />
      </div>
    </main>
  );
}
