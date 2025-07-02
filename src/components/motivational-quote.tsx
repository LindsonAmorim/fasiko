
import { useEffect, useState } from "react";

const quotes = [
  {
    quote: "A jornada de mil milhas começa com um único passo.",
    author: "Lao Tzu",
  },
  {
    quote: "Acredite em si mesmo e em tudo que você é. Saiba que há algo dentro de você que é maior do que qualquer obstáculo.",
    author: "Christian D. Larson",
  },
  {
    quote: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    author: "Robert Collier",
  },
  {
    quote: "A única maneira de fazer um ótimo trabalho é amar o que você faz.",
    author: "Steve Jobs",
  },
  {
    quote: "Não tenha medo de desistir do bom para perseguir o ótimo.",
    author: "John D. Rockefeller",
  },
  {
    quote: "A persistência realiza o impossível.",
    author: "Provérbio Chinês",
  },
  {
    quote: "Caia sete vezes, levante-se oito.",
    author: "Provérbio Japonês",
  },
  {
    quote: "A vida é como andar de bicicleta. Para manter o equilíbrio, você deve continuar se movendo.",
    author: "Albert Einstein",
  },
  {
    quote: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Se você quer viver uma vida feliz, amarre-a a uma meta, não a pessoas ou coisas.",
    author: "Albert Einstein",
  },
];

export function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 120000); // 2 minutes in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-4 right-4 max-w-xs w-full p-4 bg-background/50 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10">
      <blockquote className="text-center">
        <p className="text-base font-medium text-foreground/90">"{currentQuote.quote}"</p>
        <footer className="mt-2 text-sm text-foreground/60">- {currentQuote.author}</footer>
      </blockquote>
    </div>
  );
}
