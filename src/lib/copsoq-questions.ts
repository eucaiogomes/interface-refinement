// COPSOQ II — sample question set (representative subset for demo).
// Real instrument has ~40+ items across multiple dimensions.

export type ScaleKey = "frequency" | "intensity" | "agreement";

export interface Question {
  id: number;
  text: string;
  scale: ScaleKey;
  dimension: string;
}

export const SCALES: Record<ScaleKey, { value: number; label: string }[]> = {
  frequency: [
    { value: 0, label: "Nunca" },
    { value: 1, label: "Raramente" },
    { value: 2, label: "Às vezes" },
    { value: 3, label: "Frequentemente" },
    { value: 4, label: "Sempre" },
  ],
  intensity: [
    { value: 0, label: "Muito pouco" },
    { value: 1, label: "Pouco" },
    { value: 2, label: "Moderadamente" },
    { value: 3, label: "Muito" },
    { value: 4, label: "Extremamente" },
  ],
  agreement: [
    { value: 0, label: "Discordo totalmente" },
    { value: 1, label: "Discordo" },
    { value: 2, label: "Neutro" },
    { value: 3, label: "Concordo" },
    { value: 4, label: "Concordo totalmente" },
  ],
};

export const QUESTIONS: Question[] = [
  { id: 1, text: "Você precisa trabalhar muito rapidamente?", scale: "frequency", dimension: "Demandas quantitativas" },
  { id: 2, text: "Sua carga de trabalho se acumula de forma desigual, criando atrasos?", scale: "frequency", dimension: "Demandas quantitativas" },
  { id: 3, text: "Seu trabalho exige sua atenção constante?", scale: "intensity", dimension: "Demandas cognitivas" },
  { id: 4, text: "Você precisa esconder seus sentimentos no trabalho?", scale: "frequency", dimension: "Demandas emocionais" },
  { id: 5, text: "Você tem influência sobre a quantidade de trabalho que realiza?", scale: "frequency", dimension: "Influência no trabalho" },
  { id: 6, text: "Você pode decidir quando fazer uma pausa?", scale: "frequency", dimension: "Influência no trabalho" },
  { id: 7, text: "Seu trabalho oferece possibilidades de aprender coisas novas?", scale: "frequency", dimension: "Possibilidades de desenvolvimento" },
  { id: 8, text: "Você sente que o seu trabalho é importante?", scale: "agreement", dimension: "Significado do trabalho" },
  { id: 9, text: "Você recebe ajuda e apoio de seus colegas, quando necessário?", scale: "frequency", dimension: "Apoio social de colegas" },
  { id: 10, text: "Seu superior imediato fala com você sobre como está indo seu trabalho?", scale: "frequency", dimension: "Apoio social de superiores" },
  { id: 11, text: "Você se sente esgotado(a) ao final de um dia de trabalho?", scale: "frequency", dimension: "Burnout" },
  { id: 12, text: "Você confia nas informações vindas da gerência?", scale: "agreement", dimension: "Confiança vertical" },
];
