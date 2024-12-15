export interface Question {
  text: string;
  options: string[];
}

export const questions: Question[] = [
    { text: "¿Con qué frecuencia sientes que tienes demasiadas cosas por hacer en un solo día?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Te resulta difícil concentrarte en tus tareas escolares?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Con qué frecuencia te sientes abrumado por tus responsabilidades académicas?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Cuántas veces sientes ansiedad o nervios antes de un examen?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Qué tan seguido tienes dificultades para dormir debido a las preocupaciones escolares?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Te sientes irritable o impaciente con tus compañeros o profesores?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Qué tan a menudo experimentas síntomas físicos, como dolor de cabeza o tensión muscular?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Con qué frecuencia te sientes incapaz de relajarte después de estudiar o hacer tus deberes?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Consideras que tu desempeño académico está siendo afectado por el estrés?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Qué tan seguido sientes que no puedes manejar todas tus responsabilidades?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Cuántas veces sientes que no tienes tiempo suficiente para actividades recreativas?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Con qué frecuencia te sientes agotado física o mentalmente?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Te resulta difícil encontrar motivación para tus actividades escolares?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Crees que el estrés está afectando tu salud mental o física?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Con qué frecuencia necesitas tomar descansos para aliviar el estrés?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Qué tan seguido te sientes aislado o desconectado de los demás?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Sientes que las exigencias académicas interfieren en tu vida personal o familiar?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Tienes la sensación de que tu tiempo libre no es realmente relajante?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Con qué frecuencia piensas en las tareas pendientes incluso en tus momentos de descanso?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Te sientes incapaz de tomar decisiones debido a la presión o al estrés?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Crees que el estrés te hace olvidar tareas o compromisos?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Te sientes cada vez más sensible a las críticas o comentarios de los demás?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Tiendes a procrastinar más cuando te sientes estresado?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Sientes que el estrés te impide disfrutar tus logros académicos?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
    { text: "¿Qué tan a menudo sientes que el estrés afecta tus relaciones con tus amigos o familiares?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
];

export const stressScores = {
  "Nunca": 0,
  "Rara vez": 1,
  "A veces": 2,
  "Frecuentemente": 3,
  "Siempre": 4
} as const;

export const calculateStressPercentage = (answers: string[]): number => {
  const totalScore = answers.reduce((acc, answer) => {
    return acc + (stressScores[answer as keyof typeof stressScores] || 0);
  }, 0);

  const maxScore = questions.length * 4; // 4 is max points per question
  return Math.round((totalScore / maxScore) * 100);
}; 

