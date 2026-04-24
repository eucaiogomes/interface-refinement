import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Globe,
  ChevronRight,
  Clock,
  Star,
  Users,
  Play,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// --- Types ---
interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "COURSE" | "TRAIL" | "RECORD";
  thumb: string;
  duration?: string;
  rating?: number;
  students?: number;
  progress?: number;
  grade?: number;
  price?: string;
  authors?: string;
}

interface Section {
  id: string;
  title: string;
  variant: string;
  items: ContentItem[];
}

// --- Mock data ---
const BANNERS = [
  {
    id: "1",
    title: "Avaliação Psicossocial COPSOQ II",
    subtitle: "Disponível agora · 12 perguntas · ~5 min",
    cta: "Iniciar avaliação",
    href: "/avaliacao-intro",
    gradient: "from-brand-primary via-brand-secondary to-brand-primary-glow",
  },
  {
    id: "2",
    title: "Trilha de bem-estar no trabalho",
    subtitle: "Conteúdos selecionados pela equipe de RH",
    cta: "Explorar trilha",
    href: "#",
    gradient: "from-brand-secondary via-brand-primary to-brand-accent",
  },
];

const SAMPLE_TITLES = [
  "Saúde mental no ambiente corporativo",
  "Liderança humanizada e gestão de equipes",
  "Comunicação não-violenta na prática",
  "Gestão do tempo e produtividade pessoal",
  "Inteligência emocional para líderes",
  "Feedback construtivo e cultura de confiança",
  "Diversidade, equidade e inclusão",
  "Resiliência em tempos de mudança",
  "Negociação baseada em interesses",
  "Design thinking aplicado a problemas reais",
  "Tomada de decisão sob incerteza",
];

const generateItems = (count: number, prefix: string): ContentItem[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    title: SAMPLE_TITLES[i % SAMPLE_TITLES.length],
    description:
      "Curso prático com estudos de caso, exercícios e materiais complementares para aplicar no dia a dia.",
    type: "COURSE",
    thumb: "",
    authors: "Equipe Lector",
    duration: `${(i % 6) + 2}h${(i * 7) % 60}m`,
    price: "R$ 89,90",
    progress: (i * 13) % 100,
    grade: 70 + (i % 30),
    rating: 4 + ((i % 10) / 10),
    students: 120 + i * 37,
  }));

const SECTIONS: Section[] = [
  { id: "s1", title: "Em destaque", variant: "simples", items: generateItems(11, "s1") },
  { id: "s2", title: "Continuar assistindo", variant: "simples", items: generateItems(11, "s2") },
  { id: "s3", title: "Novidades da semana", variant: "simples", items: generateItems(11, "s3") },
  { id: "c1", title: "Recomendados para você", variant: "completo", items: generateItems(11, "c1") },
  { id: "c2", title: "Mais populares", variant: "completo", items: generateItems(11, "c2") },
  { id: "c3", title: "Trilhas de carreira", variant: "completo", items: generateItems(11, "c3") },
  { id: "a1", title: "Lançamentos premium", variant: "avancado", items: generateItems(11, "a1") },
  { id: "a2", title: "Coleção editorial", variant: "avancado", items: generateItems(11, "a2") },
];

// --- Initials placeholder (for thumbs) ---
function ThumbPlaceholder({ title, className = "" }: { title: string; className?: string }) {
  const initial = title.trim().charAt(0).toUpperCase() || "•";
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-brand-primary/15 via-brand-primary/10 to-brand-accent/20 text-brand-primary font-bold ${className}`}
    >
      <span className="text-2xl">{initial}</span>
    </div>
  );
}

// --- Navbar ---
function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ContentItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const all = SECTIONS.flatMap((s) => s.items);
      const filtered = all
        .filter((it) => it.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Keyboard shortcut: "/" focuses the search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="LECTOR — início"
          >
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-spring shadow-elevated">
              L
            </div>
            <span className="font-bold text-xl text-brand-primary tracking-tight hidden sm:block">
              LECTOR
            </span>
          </Link>

          {/* Search & actions */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end max-w-2xl">
            <div className="relative group flex-1 max-w-md">
              <input
                ref={inputRef}
                type="text"
                placeholder="Pesquisar conteúdos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Pesquisar conteúdos"
                className="w-full pl-10 pr-12 py-2.5 bg-muted border border-transparent focus:bg-card focus:ring-2 focus:ring-accent/30 focus:border-accent/40 rounded-full text-sm transition-smooth outline-none"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-smooth" />
              <kbd className="hidden lg:flex absolute right-3 top-2.5 items-center px-1.5 h-5 text-[10px] font-mono text-muted-foreground bg-card border border-border rounded">
                /
              </kbd>

              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-elevated border border-border overflow-hidden z-50 animate-slide-up">
                  <div className="p-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSearchQuery("");
                          setSuggestions([]);
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-muted rounded-xl flex items-center gap-3 transition-smooth group"
                      >
                        <ThumbPlaceholder title={item.title} className="w-10 h-10 rounded-lg shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-foreground group-hover:text-brand-primary transition-smooth line-clamp-1">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                            Treinamento
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-smooth relative"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full ring-2 ring-background" />
            </button>

            <button
              className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-smooth"
              aria-label="Idioma"
            >
              <Globe className="h-5 w-5" />
            </button>

            <div className="h-8 w-px bg-border mx-1" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 pr-3 hover:bg-muted rounded-full transition-smooth">
                  <div className="w-8 h-8 rounded-full gradient-brand text-primary-foreground flex items-center justify-center text-sm font-bold">
                    C
                  </div>
                  <span className="text-sm font-medium text-foreground hidden lg:block">
                    Caio Gomes
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Minha área</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- Banner ---
function Banner({ banner }: { banner: (typeof BANNERS)[number] }) {
  return (
    <Link
      to={banner.href}
      className={`group relative block w-full h-40 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-br ${banner.gradient} shadow-elevated transition-spring hover:scale-[1.01]`}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute right-1/3 -bottom-12 w-56 h-56 rounded-full bg-brand-accent/40 blur-3xl" />
      </div>
      <div className="relative h-full flex flex-col justify-center px-6 md:px-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary-foreground/80 font-bold mb-2">
          <Sparkles className="h-3 w-3" />
          Em destaque
        </div>
        <h3 className="text-primary-foreground text-xl md:text-3xl font-bold tracking-tight leading-tight">
          {banner.title}
        </h3>
        <p className="text-primary-foreground/80 text-sm md:text-base mt-1.5">{banner.subtitle}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-primary-foreground font-semibold text-sm group-hover:gap-3 transition-spring">
          <span className="px-4 py-2 bg-accent rounded-full shadow-accent">{banner.cta}</span>
          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
      </div>
    </Link>
  );
}

// --- Cards ---
function CardSimples({ item }: { item: ContentItem }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3 shadow-soft group-hover:shadow-elevated transition-smooth">
        <ThumbPlaceholder title={item.title} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-card/95 flex items-center justify-center shadow-elevated">
            <Play className="h-5 w-5 text-brand-primary ml-0.5" fill="currentColor" />
          </div>
        </div>
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-card/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-brand-primary rounded">
          Curso
        </span>
      </div>
      <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-brand-primary transition-smooth">
        {item.title}
      </h4>
      <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {item.duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {item.rating?.toFixed(1)}
        </span>
      </div>
    </article>
  );
}

function CardCompleto({ item }: { item: ContentItem }) {
  return (
    <article className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth border border-border">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <ThumbPlaceholder title={item.title} className="w-full h-full" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-brand-primary rounded-md shadow-soft">
          Curso
        </span>
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-brand-primary transition-smooth">
          {item.title}
        </h4>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3" />
            {item.students}
          </span>
          <span className="font-bold text-brand-primary">{item.price}</span>
        </div>
      </div>
    </article>
  );
}

function CardAvancado({ item }: { item: ContentItem }) {
  return (
    <article className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth">
      <ThumbPlaceholder title={item.title} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="inline-block px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider rounded mb-2">
          Premium
        </span>
        <h4 className="text-primary-foreground text-base font-bold line-clamp-3 leading-tight">
          {item.title}
        </h4>
        <div className="mt-2 flex items-center gap-2 text-primary-foreground/80 text-xs">
          <Clock className="h-3 w-3" />
          {item.duration}
        </div>
      </div>
    </article>
  );
}

// --- Carousel row ---
function CarouselRow({ section, variant }: { section: Section; variant: "simples" | "completo" | "avancado" }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
          {section.title}
        </h2>
        <button className="text-xs font-semibold text-brand-primary hover:text-accent inline-flex items-center gap-1 transition-smooth">
          Ver todos
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scroll-smooth">
        {section.items.map((item) => (
          <div
            key={item.id}
            className={`shrink-0 snap-start ${
              variant === "avancado" ? "w-44 md:w-52" : "w-64 md:w-72"
            }`}
          >
            {variant === "simples" && <CardSimples item={item} />}
            {variant === "completo" && <CardCompleto item={item} />}
            {variant === "avancado" && <CardAvancado item={item} />}
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Main ---
export default function Index() {
  const navigate = useNavigate();
  const simples = SECTIONS.filter((s) => s.variant === "simples");
  const completo = SECTIONS.filter((s) => s.variant === "completo");
  const avancado = SECTIONS.filter((s) => s.variant === "avancado");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 md:py-10 space-y-10 max-w-[1600px]">
        {/* Hero CTA */}
        <section className="rounded-3xl gradient-brand p-6 md:p-10 shadow-elevated relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-brand-accent/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full bg-brand-primary-glow/40 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-5xl">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary-foreground/90 font-bold mb-3">
                <Sparkles className="h-3 w-3" />
                Avaliação disponível
              </div>
              <h1 className="text-primary-foreground text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                Bem-vindo de volta, Caio.
              </h1>
              <p className="text-primary-foreground/80 mt-2 text-sm md:text-base max-w-xl">
                Sua avaliação psicossocial COPSOQ II está disponível. Leva cerca de 5 minutos e suas
                respostas são confidenciais.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => navigate("/avaliacao-intro")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent rounded-full px-7 h-12 font-semibold text-base shrink-0"
            >
              Iniciar avaliação
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Banners */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BANNERS.map((b) => (
            <Banner key={b.id} banner={b} />
          ))}
        </section>

        {/* Tabbed catalog */}
        <Tabs defaultValue="simples" className="w-full">
          <TabsList className="bg-muted/60 border border-border p-1 h-auto rounded-full">
            <TabsTrigger
              value="simples"
              className="rounded-full px-5 py-2 data-[state=active]:bg-card data-[state=active]:text-brand-primary data-[state=active]:shadow-soft font-semibold text-sm"
            >
              Simples
            </TabsTrigger>
            <TabsTrigger
              value="completo"
              className="rounded-full px-5 py-2 data-[state=active]:bg-card data-[state=active]:text-brand-primary data-[state=active]:shadow-soft font-semibold text-sm"
            >
              Completo
            </TabsTrigger>
            <TabsTrigger
              value="avancado"
              className="rounded-full px-5 py-2 data-[state=active]:bg-card data-[state=active]:text-brand-primary data-[state=active]:shadow-soft font-semibold text-sm"
            >
              Avançado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simples" className="mt-8 space-y-10">
            {simples.map((s) => (
              <CarouselRow key={s.id} section={s} variant="simples" />
            ))}
          </TabsContent>
          <TabsContent value="completo" className="mt-8 space-y-10">
            {completo.map((s) => (
              <CarouselRow key={s.id} section={s} variant="completo" />
            ))}
          </TabsContent>
          <TabsContent value="avancado" className="mt-8 space-y-10">
            {avancado.map((s) => (
              <CarouselRow key={s.id} section={s} variant="avancado" />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
