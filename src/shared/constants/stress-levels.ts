export interface StressLevel {
  range: [number, number];
  state: string;
  description: string;
  suggestion: string;
  consequences: string;
}

export const STRESS_LEVELS: StressLevel[] = [
  {
    range: [0, 10],
    state: "Para nada estresado",
    description: "Usted está completamente relajado, lo cual es ideal para un buen desempeño académico.",
    suggestion: "Continue con sus hábitos saludables, como organizar su tiempo y tomar descansos regulares. Mantenga la buena comunicación con amigos y compañeros.",
    consequences: "En este nivel, se reduce el riesgo de agotamiento mental y mejora la capacidad de concentración a largo plazo."
  },
  {
    range: [11, 20],
    state: "Ligeramente estresado",
    description: "Hay un leve estrés posiblemente causado por el ritmo universitario.",
    suggestion: "Realice ejercicios cortos de respiración o tome un descanso para despejar la mente. Aprende tiempos de ocio en su planificación.",
    consequences: "Puede impactar en el desempeño académico manteniéndolo bajo control."
  },
  {
    range: [21, 30],
    state: "Moderadamente estresado",
    description: "Su nivel de estrés está en un rango normal pero merece atención para evitar que aumente.",
    suggestion: "Priorice tareas importantes y delegue cuando sea posible. Participe en actividades extracurriculares que le hagan que disfrute.",
    consequences: "Podría sentirse fatigado o experimentar dificultades para dormir si no maneja adecuadamente este nivel de estrés."
  },
  {
    range: [31, 40],
    state: "Algo estresado",
    description: "Comienza a mostrar signos de estrés acumulado, debido a exámenes, proyectos o falta de descanso.",
    suggestion: "Cree una lista de tareas priorizadas. Reserve tiempo específico para el estudio y el ocio. Considere desconectarse del teléfono durante unas horas para concentrarse mejor.",
    consequences: "Su rendimiento académico podría disminuir si este nivel de estrés persiste durante varias semanas."
  },
  {
    range: [41, 50],
    state: "Estresado",
    description: "Su nivel de estrés está notablemente alto y podría empezar a afectar su desempeño.",
    suggestion: "Incorpore pausas activas durante el estudio, como estiramientos o ejercicios de respiración. Busque apoyo de amigos, mentores o compañeros si siente sobrecarga emocional.",
    consequences: "Podría experimentar irritabilidad, ansiedad o pérdida de motivación si no toma medidas."
  },
  {
    range: [51, 60],
    state: "Bastante estresado",
    description: "Su estrés es significativo y podría impactar su salud emocional.",
    suggestion: "Asista a talleres de manejo del estrés en el campus. Evite el exceso de cafeína y priorice el sueño. Divida las tareas grandes en partes pequeñas para reducir la sensación de sobrecarga.",
    consequences: "Si no se controla, podría llevar a agotamiento académico y problemas de salud, como dolores de cabeza frecuentes."
  },
  {
    range: [61, 70],
    state: "Muy estresado",
    description: "Su nivel de estrés podría afectar sus relaciones sociales y desempeño académico.",
    suggestion: "Consulte con un orientador o terapeuta en la universidad. Reduzca actividades no esenciales. Dedique tiempo a hobbies relajantes o a compartir con amigos fuera del contexto académico.",
    consequences: "El estrés prolongado a este nivel podría causar problemas para concentrarse y aislamiento social."
  },
  {
    range: [71, 80],
    state: "Extremadamente estresado",
    description: "Su estrés está en un rango crítico y podría comprometer su bienestar general.",
    suggestion: "Es crucial hablar con un profesional de salud mental o consejero académico. Revise sus prioridades y considere reducir su carga académica temporalmente si es necesario.",
    consequences: "Podría experimentar agotamiento emocional severo, afectando su capacidad de tomar decisiones y disfrutar de sus actividades."
  },
  {
    range: [81, 90],
    state: "Al borde del colapso",
    description: "Su estrés podría estar afectando todos los aspectos de su vida universitaria y personal.",
    suggestion: "Consulte con un profesional de salud inmediatamente. Reduzca su carga de trabajo y enfoque sus energías en el autocuidado. Participe en actividades grupales que lo relajen y apoyen emocionalmente.",
    consequences: "Este nivel de estrés puede llevar a problemas serios de salud mental, como ansiedad crónica o depresión, si no se maneja adecuadamente."
  },
  {
    range: [91, 100],
    state: "En colapso total",
    description: "Su nivel de estrés es crítico y podría requerir intervención inmediata.",
    suggestion: "Detenga todas las actividades no esenciales y priorice su salud. Consulte con servicios de salud mental en la universidad de ser necesario. Comuníquese con su familia y busque apoyo para obtener ayuda.",
    consequences: "Este nivel podría llevar a abandono académico, crisis de salud mental o enfermedades físicas graves."
  }
]; 