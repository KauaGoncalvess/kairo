import { Chrome } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { Manifesto, Services, Processo, Prova, Contato } from "@/components/sections";

export default function Home() {
  return (
    <Chrome>
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Processo />
        <Prova />
        <Contato />
      </main>
    </Chrome>
  );
}
