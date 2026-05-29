import { GraduationCap, UserRound, Gift } from "lucide-react";
import { planCtaUrl } from "../Helpers/checkout-flow";

export const freePlan = {
  id: "gratuito",
  title: "Gratuito",
  price: "$0",
  priceAmount: 0,
  period: "siempre",
  tipo: "estudiante",
  desc: "Acceso a blogs y contenido editorial. Mejora tu plan para cursos y certificados.",
  highlighted: false,
  isFree: true,
  benefits: [
    "Acceso completo al blog Knowly",
    "Artículos de aprendizaje y herramientas",
    "Comunidad (solo lectura)",
    "Vista previa del catálogo de cursos",
  ],
};

export const studentMemberships = [
  freePlan,
  {
    id: "basico",
    title: "Básico",
    price: "$10",
    priceAmount: 10,
    period: "mes",
    tipo: "estudiante",
    desc: "Ideal para empezar tu formación con acceso esencial al catálogo Knowly.",
    highlighted: false,
    benefits: [
      "Acceso a 5 cursos del catálogo básico",
      "Certificados digitales al completar",
      "Foros de comunidad (lectura)",
      "Material descargable en PDF",
      "Soporte por correo en 48 h",
    ],
  },
  {
    id: "premium",
    title: "Premium",
    price: "$20",
    priceAmount: 20,
    period: "mes",
    tipo: "estudiante",
    desc: "La opción más elegida: aprende sin límites con recursos extra.",
    highlighted: true,
    benefits: [
      "Catálogo completo sin restricciones",
      "Certificados acreditados Knowly",
      "Participación activa en foros",
      "Rutas de aprendizaje guiadas",
      "Descargas ilimitadas y quizzes",
      "Soporte prioritario en 24 h",
    ],
  },
  {
    id: "anual",
    title: "Anual",
    price: "$100",
    priceAmount: 100,
    period: "año",
    tipo: "estudiante",
    desc: "Ahorra más del 50% con un año entero de formación premium.",
    highlighted: false,
    benefits: [
      "Todo lo incluido en Premium",
      "Badge exclusivo de estudiante anual",
      "Acceso anticipado a cursos nuevos",
      "2 sesiones de mentoría grupal al mes",
      "Prioridad en nuevos lanzamientos del catálogo",
      "Renovación automática con mejor precio",
    ],
  },
];

export const teacherMemberships = [
  {
    id: "docente-estandar",
    title: "Docente Estándar",
    price: "$15",
    priceAmount: 15,
    period: "mes",
    tipo: "profesor",
    desc: "Para docentes que publican contenido de forma constante pero moderada.",
    highlighted: false,
    coursesPerMonth: 2,
    hoursPerMonth: 40,
    benefits: [
      "Hasta 2 cursos nuevos por mes",
      "Máximo 40 horas de video al mes",
      "Panel de ventas básico",
      "Tu nombre como profesor creador",
      "Revisión de calidad en 5 días hábiles",
      "Soporte por correo",
    ],
  },
  {
    id: "docente-pro",
    title: "Docente Pro",
    price: "$35",
    priceAmount: 35,
    period: "mes",
    tipo: "profesor",
    desc: "Para creadores activos que necesitan escalar su oferta educativa.",
    highlighted: true,
    coursesPerMonth: 8,
    hoursPerMonth: 120,
    benefits: [
      "Hasta 8 cursos nuevos por mes",
      "Máximo 120 horas de video al mes",
      "Analíticas avanzadas de estudiantes",
      "Insignia Pro en tu perfil docente",
      "Revisión prioritaria en 48 h",
      "Promoción destacada en el catálogo",
      "Soporte dedicado y webinars mensuales",
    ],
  },
];

export function getPlanById(planId, tipo = "estudiante") {
  if (tipo === "profesor") {
    const teacher = teacherMemberships.find((p) => p.id === planId);
    if (teacher) return teacher;
  }
  const student = studentMemberships.find((p) => p.id === planId);
  if (student) return student;
  const teacher = teacherMemberships.find((p) => p.id === planId);
  if (teacher) return teacher;
  if (planId === "gratuito") return freePlan;
  return null;
}

export const navbarMembershipLinks = [
  {
    section: "Estudiantes",
    items: studentMemberships.map((p) => ({
      to: p.isFree ? "/estudiantes?plan=gratuito" : planCtaUrl(p, "estudiante"),
      label: p.title,
      desc: p.isFree ? "Solo blogs" : `${p.price}/${p.period}`,
      icon: p.isFree ? Gift : GraduationCap,
    })),
  },
  {
    section: "Profesores",
    items: teacherMemberships.map((p) => ({
      to: planCtaUrl(p, "profesor"),
      label: p.title,
      desc: `${p.coursesPerMonth} cursos · ${p.hoursPerMonth} h/mes`,
      icon: UserRound,
    })),
  },
];
