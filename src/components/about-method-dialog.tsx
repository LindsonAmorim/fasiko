import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AboutMethodDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-background/80 backdrop-blur-lg hover:bg-white/10 hover:text-white transition-all duration-300 shadow-lg"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background/80 backdrop-blur-lg border-none sm:rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            💡 O Método 52/17
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-foreground/90 text-base">
          <p>
            O método 52/17 é uma técnica de gerenciamento de tempo simples, mas
            poderosa, para aumentar sua produtividade.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">💻</span>
              <div>
                <h3 className="font-semibold">Trabalhe por 52 Minutos</h3>
                <p className="text-foreground/70">
                  Dedique um bloco de 52 minutos para um trabalho focado e
                  ininterrupto em uma única tarefa. Sem distrações!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">☕</span>
              <div>
                <h3 className="font-semibold">Descanse por 17 Minutos</h3>
                <p className="text-foreground/70">
                  Após o seu sprint de trabalho, faça uma pausa completa de 17
                  minutos. Afaste-se da sua mesa, alongue-se ou faça algo que
                  você goste.
                </p>
              </div>
            </div>
          </div>
          <p className="font-semibold text-center pt-4">
            Repita o processo! 🔁 Este ciclo ajuda a manter a energia e o foco
            elevados ao longo do dia.
          </p>

          <p className="text-sm text-foreground/60 text-center">
            Fasiko é seu novo aliado na jornada de produtividade inteligente.
            Baseado na técnica 52/17, o app combina foco intenso e pausas
            estratégicas para manter sua mente no ritmo ideal. Com uma interface
            fluida, ciclos de tempo personalizados e relatórios de desempenho,
            Fasiko transforma tarefas comuns em sessões poderosas de alta
            performance. Saia do piloto automático. Encontre seu ritmo produtivo
            com Fasiko.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
