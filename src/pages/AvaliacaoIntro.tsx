import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const SCALE_CHIPS = [
  { label: "Nunca", intensity: 0 },
  { label: "Raramente", intensity: 1 },
  { label: "Às vezes", intensity: 2 },
  { label: "Frequentemente", intensity: 3 },
  { label: "Sempre", intensity: 4 },
];

// Smooth color progression from neutral to accent
const intensityClasses = [
  "bg-muted text-muted-foreground border-border",
  "bg-accent/10 text-foreground border-accent/20",
  "bg-accent/25 text-foreground border-accent/30",
  "bg-accent/55 text-accent-foreground border-accent/50",
  "bg-accent text-accent-foreground border-accent shadow-accent",
];

export default function AvaliacaoIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto relative pb-32 lg:pb-12">
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

      {/* Main content */}
      <main className="w-full max-w-[1100px] mx-auto px-6 md:px-12 mt-4 md:mt-8">
        <div className="flex flex-col items-start w-full animate-slide-up">
          {/* Kicker */}
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-4">
            Avaliação · COPSOQ II
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary tracking-tight text-left mb-10 md:mb-14 leading-[1.1]">
            Questionário Psicossocial Copenhagen
          </h1>

          <div className="w-full max-w-[820px] flex flex-col gap-12">
            {/* Description */}
            <div className="space-y-5">
              <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground">
                Você responderá perguntas sobre seu ambiente de trabalho.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground">
                Escolha a alternativa que melhor representa sua experiência.
              </p>
            </div>

            {/* Scale chips */}
            <div className="space-y-4">
              <p className="font-bold text-brand-primary text-base">Escala de respostas:</p>
              <div className="flex flex-wrap items-center gap-2.5">
                {SCALE_CHIPS.map((chip) => (
                  <span
                    key={chip.label}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-smooth ${intensityClasses[chip.intensity]}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Reassurance callout */}
            <div className="flex items-start gap-4 bg-accent/5 border-l-4 border-accent rounded-r-2xl p-5 md:p-6">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-5 h-5 text-accent" fill="currentColor" />
              </div>
              <div>
                <p className="font-bold text-brand-primary text-base md:text-lg">
                  Não existem respostas certas ou erradas.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Suas respostas são confidenciais e usadas apenas para análise agregada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forward — desktop circular floating */}
      <div className="hidden lg:block fixed right-12 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => navigate("/questionario")}
          aria-label="Começar avaliação"
          className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-accent hover:scale-110 active:scale-95 transition-spring"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={3} />
        </button>
      </div>

      {/* Forward — mobile/tablet pill CTA */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 px-4 pb-4 pt-6 bg-gradient-to-t from-background via-background to-transparent z-20">
        <button
          onClick={() => navigate("/questionario")}
          className="w-full h-14 rounded-full bg-accent text-accent-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-accent hover:bg-accent/90 active:scale-[0.98] transition-spring"
        >
          Começar avaliação
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
