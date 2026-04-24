import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSurveyState } from "@/lib/survey-state";
import { QUESTIONS, SCALES } from "@/lib/copsoq-questions";

export default function Obrigado() {
  const navigate = useNavigate();
  const { answers } = useSurveyState(QUESTIONS.length);

  const handleDownload = () => {
    const lines: string[] = [
      "COPSOQ II — Suas respostas",
      "============================",
      "",
    ];
    QUESTIONS.forEach((q) => {
      const value = answers[q.id];
      const opt = SCALES[q.scale].find((s) => s.value === value);
      lines.push(`${q.id}. ${q.text}`);
      lines.push(`   Dimensão: ${q.dimension}`);
      lines.push(`   Resposta: ${opt ? opt.label : "— não respondida —"}`);
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "copsoq-respostas.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      {/* Top bar */}
      <div className="w-full px-6 py-6 md:px-12 md:py-8">
        <button
          onClick={() => navigate("/")}
          aria-label="Voltar à vitrine"
          className="w-10 h-10 rounded-full bg-card border border-accent/40 flex items-center justify-center text-accent hover:bg-accent/10 hover:scale-105 active:scale-95 transition-spring shadow-soft"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      <main className="w-full max-w-[1100px] mx-auto px-6 md:px-12 pb-20 mt-4 md:mt-8">
        <div className="flex flex-col items-start w-full animate-slide-up">
          {/* Success badge */}
          <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mb-8 animate-scale-in">
            <Check className="w-10 h-10 text-accent" strokeWidth={3} />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary tracking-tight mb-6 md:mb-8 leading-[1.1]">
            Obrigado pela sua participação.
          </h1>

          <div className="w-full max-w-[800px] flex flex-col gap-8">
            <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
              As suas respostas foram registradas nesta sessão. Você pode fechar esta página em
              segurança.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7 font-semibold shadow-accent"
              >
                Voltar ao início
              </Button>
              <Button
                onClick={handleDownload}
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-7 font-semibold border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-primary-foreground transition-smooth"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar respostas
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
