import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Check, Menu, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { QUESTIONS, SCALES } from "@/lib/copsoq-questions";
import { useSurveyState } from "@/lib/survey-state";

export default function Questionario() {
  const navigate = useNavigate();
  const total = QUESTIONS.length;
  const { answers, current, setAnswer, setCurrent } = useSurveyState(total);
  const [justAnswered, setJustAnswered] = useState(false);

  const q = QUESTIONS[current];
  const options = SCALES[q.scale];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / total) * 100);
  const isAnswered = answers[q.id] !== undefined;

  const goNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      setJustAnswered(false);
    } else {
      navigate("/obrigado");
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setJustAnswered(false);
    }
  };

  const select = (value: number) => {
    setAnswer(q.id, value);
    setJustAnswered(true);
  };

  const Pagination = (
    <PaginationPanel
      current={current}
      total={total}
      answers={answers}
      progress={progress}
      answeredCount={answeredCount}
      onJump={(i) => {
        setCurrent(i);
        setJustAnswered(false);
      }}
    />
  );

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <header className="border-b border-border bg-background/85 backdrop-blur-xl sticky top-0 z-30">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir paginação">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Paginação</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{Pagination}</div>
                </SheetContent>
              </Sheet>

              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                <Link
                  to="/"
                  className="hover:text-brand-primary hover:underline underline-offset-4 font-medium transition-smooth"
                >
                  Vitrine
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-border shrink-0" />
                <span className="font-semibold text-brand-primary truncate">
                  COPSOQ II Abril/2026
                </span>
              </nav>
            </div>

            {/* Counter */}
            <div className="text-xs md:text-sm font-medium text-muted-foreground tabular-nums shrink-0">
              Pergunta <span className="text-brand-primary font-bold">{current + 1}</span> de {total}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-12 pt-6 lg:pt-10 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
            {/* Question card */}
            <main className="relative flex flex-col" key={q.id}>
              <div className="animate-slide-up">
                {/* Dimension chip */}
                <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-bold text-accent mb-3">
                  {q.dimension}
                </span>

                <div className="flex items-baseline gap-3 md:gap-4">
                  <span className="text-3xl md:text-4xl font-bold text-accent leading-none tabular-nums">
                    {current + 1}.
                  </span>
                  <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold text-brand-primary leading-snug md:leading-normal">
                    {q.text}
                  </h1>
                </div>
              </div>

              {/* Options */}
              <div className="mt-8 md:mt-10 flex flex-col gap-2">
                {options.map((opt) => {
                  const selected = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => select(opt.value)}
                      className={cn(
                        "w-full h-14 md:h-16 flex items-center gap-4 px-4 md:px-5 rounded-xl border text-left transition-smooth group",
                        selected
                          ? "bg-accent/10 border-accent shadow-soft"
                          : "bg-card border-border hover:border-accent/40 hover:bg-accent/5",
                      )}
                    >
                      {/* Radio */}
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full border-2 shrink-0 transition-smooth",
                          selected
                            ? "border-accent bg-card"
                            : "border-border group-hover:border-accent/50",
                        )}
                      >
                        {selected && (
                          <span className="h-3 w-3 rounded-full bg-accent animate-scale-in" />
                        )}
                      </span>

                      {/* Label */}
                      <span
                        className={cn(
                          "flex-1 text-base md:text-lg transition-smooth",
                          selected
                            ? "text-brand-primary font-semibold"
                            : "text-foreground/85 group-hover:text-foreground",
                        )}
                      >
                        {opt.label}
                      </span>

                      {/* Numeric scale index */}
                      <span
                        className={cn(
                          "text-xs font-mono tabular-nums shrink-0 transition-smooth",
                          selected ? "text-accent font-bold" : "text-muted-foreground/60",
                        )}
                      >
                        {opt.value}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hint + inline navigation */}
              <div className="mt-8 flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-6">
                <div className="min-h-6 flex items-center gap-2">
                  {!isAnswered && (
                    <>
                      <Info className="h-4 w-4 text-accent shrink-0" />
                      <p className="text-sm text-accent font-medium">
                        Selecione uma alternativa para continuar
                      </p>
                    </>
                  )}
                </div>

                {/* Inline navigation buttons (always visible) */}
                <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
                  <Button
                    variant="ghost"
                    onClick={goPrev}
                    disabled={current === 0}
                    className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 px-5 h-12"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                  <Button
                    onClick={goNext}
                    disabled={!isAnswered}
                    className={cn(
                      "rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent disabled:opacity-30 disabled:shadow-none px-7 h-12 font-semibold",
                      justAnswered && isAnswered && "animate-pulse-soft",
                    )}
                  >
                    {current === total - 1 ? "Concluir" : "Próxima"}
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </div>
              </div>
            </main>

            {/* Side panel */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  {Pagination}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function PaginationPanel({
  current,
  total,
  answers,
  progress,
  answeredCount,
  onJump,
}: {
  current: number;
  total: number;
  answers: Record<number, number>;
  progress: number;
  answeredCount: number;
  onJump: (i: number) => void;
}) {
  const items = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  return (
    <div className="flex flex-col">
      {/* Progress with floating chip */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Progresso
          </span>
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {answeredCount} de {total}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative h-1.5 w-full rounded-full bg-muted overflow-visible"
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {progress > 0 && (
            <div
              className="absolute -top-7 -translate-x-1/2 transition-all duration-500 ease-out"
              style={{ left: `${Math.min(Math.max(progress, 6), 94)}%` }}
            >
              <span className="px-2 py-0.5 text-[10px] font-bold text-accent-foreground bg-accent rounded shadow-accent tabular-nums">
                {progress}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wider">
          Paginação
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">
        {items.map((i) => {
          const id = QUESTIONS[i].id;
          const isCurrent = i === current;
          const isAnswered = answers[id] !== undefined;
          const preview =
            QUESTIONS[i].text.length > 40
              ? QUESTIONS[i].text.slice(0, 40) + "…"
              : QUESTIONS[i].text;

          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onJump(i)}
                  className={cn(
                    "relative aspect-square rounded-md text-xs font-bold flex items-center justify-center transition-smooth tabular-nums",
                    isCurrent
                      ? "border-2 border-accent text-accent bg-accent/10"
                      : isAnswered
                        ? "bg-brand-primary text-primary-foreground hover:bg-brand-primary-glow"
                        : "border border-border text-muted-foreground hover:border-accent/40 bg-card",
                  )}
                  aria-label={`Questão ${i + 1}${isAnswered ? " — respondida" : ""}${isCurrent ? " — atual" : ""}`}
                >
                  {isAnswered && !isCurrent ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : (
                    i + 1
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[220px] text-xs">
                <span className="font-bold">#{i + 1}</span> · {preview}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-7 space-y-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-md border-2 border-accent text-accent bg-accent/10 shrink-0" />
          Questão atual
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-md bg-brand-primary flex items-center justify-center shrink-0">
            <Check className="h-3 w-3 text-primary-foreground stroke-[3]" />
          </div>
          Respondido
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-md border border-border bg-card shrink-0" />
          Não respondido
        </div>
      </div>
    </div>
  );
}
