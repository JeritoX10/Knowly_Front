export const defaultCoursesCatalog = [
  {
    id: "javascript",
    name: "Introducción a JavaScript",
    category: "Programación",
    level: "Principiante",
    duration: "24 h",
    instructor: "Prof. García",
    createdBy: "Prof. García",
    accent: "#f59e0b",
    description: "Fundamentos del lenguaje web más usado del mundo.",
    sections: [
      {
        title: "Primeros pasos",
        lessons: [
          { title: "¿Qué es JavaScript?", video: "https://www.youtube.com/embed/W6NZfCO5SIk", description: "Historia, usos y ecosistema de JavaScript." },
          { title: "Variables y tipos", video: "https://www.youtube.com/embed/Bv_5Zv5c-Ts", description: "let, const, strings, números y booleanos." },
        ],
      },
      {
        title: "DOM y eventos",
        lessons: [
          { title: "Manipular el DOM", video: "https://www.youtube.com/embed/y17RuWkWdn8", description: "Selecciona y modifica elementos HTML." },
        ],
      },
    ],
  },
  {
    id: "react",
    name: "React para principiantes",
    category: "Programación",
    level: "Intermedio",
    duration: "30 h",
    instructor: "Prof. Martínez",
    createdBy: "Prof. Martínez",
    accent: "#06b6d4",
    description: "Construye interfaces modernas con componentes y hooks.",
    sections: [
      {
        title: "Fundamentos de React",
        lessons: [
          { title: "Componentes y JSX", video: "https://www.youtube.com/embed/Tn6-PIqc4UM", description: "Tu primera app con Create React App." },
          { title: "Props y estado", video: "https://www.youtube.com/embed/O6P86uwfdR0", description: "Comunicación entre componentes." },
        ],
      },
    ],
  },
  {
    id: "nodejs",
    name: "Desarrollo con Node.js",
    category: "Backend",
    level: "Intermedio",
    duration: "28 h",
    instructor: "Prof. López",
    createdBy: "Prof. López",
    accent: "#22c55e",
    description: "APIs, Express y bases de datos con JavaScript en servidor.",
    sections: [
      {
        title: "Servidor con Node",
        lessons: [
          { title: "Introducción a Node.js", video: "https://www.youtube.com/embed/TlB_eWDSMt4", description: "Runtime, npm y primer servidor." },
        ],
      },
    ],
  },
  {
    id: "python",
    name: "Python básico",
    category: "Programación",
    level: "Principiante",
    duration: "32 h",
    instructor: "Prof. Ramírez",
    createdBy: "Prof. Ramírez",
    accent: "#3b82f6",
    description: "Desde cero hasta estructuras de control y funciones.",
    sections: [
      {
        title: "Introducción a Python",
        lessons: [
          { title: "¿Qué es Python?", video: "https://www.youtube.com/embed/kqtD5dpn9C8", description: "Aprende qué es Python y por qué es tan popular." },
          { title: "Instalación y entorno", video: "https://www.youtube.com/embed/rfscVS0vtbw", description: "Prepara tu entorno de desarrollo." },
          { title: "Tu primer programa", video: "https://www.youtube.com/embed/_uQrJ0TkZlc", description: "Crea tu primer programa paso a paso." },
        ],
      },
      {
        title: "Fundamentos",
        lessons: [
          { title: "Variables y tipos", video: "https://www.youtube.com/embed/khKv-8q7YmY", description: "Strings, números y booleanos." },
          { title: "Condicionales", video: "https://www.youtube.com/embed/_uQrJ0TkZlc", description: "if, else y elif en Python." },
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    name: "Ciberseguridad esencial",
    category: "Seguridad",
    level: "Intermedio",
    duration: "26 h",
    instructor: "Prof. Vega",
    createdBy: "Prof. Vega",
    accent: "#ef4444",
    description: "Protege sistemas, redes y datos con buenas prácticas.",
    sections: [
      {
        title: "Bases de seguridad",
        lessons: [
          { title: "Amenazas comunes", video: "https://www.youtube.com/embed/inWWhr5tnEA", description: "Malware, phishing y vectores de ataque." },
        ],
      },
    ],
  },
  {
    id: "ux-ui",
    name: "Diseño UX/UI",
    category: "Diseño",
    level: "Principiante",
    duration: "20 h",
    instructor: "Prof. Asprilla",
    createdBy: "Prof. Asprilla",
    accent: "#ec4899",
    description: "Principios de experiencia de usuario e interfaces atractivas.",
    sections: [
      {
        title: "Fundamentos UX",
        lessons: [
          { title: "Investigación de usuarios", video: "https://www.youtube.com/embed/rtmFCcjEgEw", description: "Empatía, entrevistas y mapas de experiencia." },
        ],
      },
    ],
  },
  {
    id: "data-science",
    name: "Ciencia de datos con Python",
    category: "Datos",
    level: "Avanzado",
    duration: "40 h",
    instructor: "Prof. Herrera",
    createdBy: "Prof. Herrera",
    accent: "#8b5cf6",
    description: "Pandas, visualización y modelos predictivos básicos.",
    sections: [
      {
        title: "Análisis de datos",
        lessons: [
          { title: "Pandas esencial", video: "https://www.youtube.com/embed/vmEHCJofslg", description: "DataFrames, limpieza y agregaciones." },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "Inglés técnico para developers",
    category: "Idiomas",
    level: "Intermedio",
    duration: "18 h",
    instructor: "Prof. Collins",
    createdBy: "Prof. Collins",
    accent: "#14b8a6",
    description: "Vocabulario y comunicación para equipos de software.",
    sections: [
      {
        title: "Comunicación técnica",
        lessons: [
          { title: "Reuniones y documentación", video: "https://www.youtube.com/embed/6p_yaN9Y23Y", description: "Frases clave para standups y code reviews." },
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing digital",
    category: "Negocios",
    level: "Principiante",
    duration: "22 h",
    instructor: "Prof. Díaz",
    createdBy: "Prof. Díaz",
    accent: "#f97316",
    description: "SEO, redes sociales y embudos de conversión.",
    sections: [
      {
        title: "Estrategia digital",
        lessons: [
          { title: "SEO básico", video: "https://www.youtube.com/embed/xsVTqzratPs", description: "Optimiza contenido para buscadores." },
        ],
      },
    ],
  },
  {
    id: "photography",
    name: "Fotografía creativa",
    category: "Arte",
    level: "Principiante",
    duration: "16 h",
    instructor: "Prof. Morales",
    createdBy: "Prof. Morales",
    accent: "#a855f7",
    description: "Composición, luz y edición para principiantes.",
    sections: [
      {
        title: "Técnica y composición",
        lessons: [
          { title: "Triángulo de exposición", video: "https://www.youtube.com/embed/8Z9FFI6AClY", description: "ISO, apertura y velocidad de obturación." },
        ],
      },
    ],
  },
  {
    id: "excel",
    name: "Excel avanzado para profesionales",
    category: "Productividad",
    level: "Intermedio",
    duration: "14 h",
    instructor: "Prof. Castro",
    createdBy: "Prof. Castro",
    accent: "#16a34a",
    description: "Tablas dinámicas, fórmulas y automatización.",
    sections: [
      {
        title: "Análisis en Excel",
        lessons: [
          { title: "Tablas dinámicas", video: "https://www.youtube.com/embed/usll9w6sXcY", description: "Resume y analiza grandes volúmenes de datos." },
        ],
      },
    ],
  },
  {
    id: "leadership",
    name: "Liderazgo y gestión de equipos",
    category: "Soft skills",
    level: "Intermedio",
    duration: "20 h",
    instructor: "Prof. Núñez",
    createdBy: "Prof. Núñez",
    accent: "#6366f1",
    description: "Comunicación, feedback y motivación en entornos ágiles.",
    sections: [
      {
        title: "Liderazgo efectivo",
        lessons: [
          { title: "Estilos de liderazgo", video: "https://www.youtube.com/embed/UrEQ6G6VP7Y", description: "Adapta tu estilo al contexto del equipo." },
        ],
      },
    ],
  },
];

export const coursesCatalog = defaultCoursesCatalog;
