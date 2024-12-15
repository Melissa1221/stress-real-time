export interface Question2 {
  text: string;
  options: string[];
}

export const questions2: Question2[] = [
  { 
    text: "¿Con qué frecuencia ha estado afectado/a por algo que ha ocurrido inesperadamente?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia se ha sentido incapaz de controlar las cosas importantes en su vida?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia se ha sentido nervioso o estresado?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia ha manejado con éxito los pequeños problemas irritantes de la vida?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia ha sentido que ha afrontado efectivamente los cambios importantes?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia ha estado seguro sobre su capacidad para manejar sus problemas personales?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia ha sentido que las cosas le van bien?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia ha sentido que no podía afrontar todas las cosas que tenía que hacer?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia ha podido controlar las dificultades de su vida?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  },
  { 
    text: "¿Con qué frecuencia se ha sentido al control de todo?", 
    options: ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"] 
  }
];

export const stressScores2 = {
  "Nunca": 0,
  "Casi nunca": 1,
  "De vez en cuando": 2,
  "A menudo": 3,
  "Muy a menudo": 4
} as const;

// Questions with inverse scoring (0-based index)
const inverseQuestions = [3, 4, 6, 7, 9];

export const calculateStressPercentage2 = (answers: string[]): number => {
  const totalScore = answers.reduce((acc, answer, index) => {
    const score = stressScores2[answer as keyof typeof stressScores2] || 0;
    
    // If it's an inverse question, reverse the score (4 - score)
    if (inverseQuestions.includes(index)) {
      return acc + (4 - score);
    }
    
    return acc + score;
  }, 0);

  // PSS-10 scores range from 0-40, convert to percentage
  return Math.round((totalScore / 40) * 100);
}; 

