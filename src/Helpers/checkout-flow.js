/** URL de registro/login antes de pagar un plan */
export function buildLoginForPlan(planId, tipo = "estudiante") {
  const params = new URLSearchParams({ plan: planId, tipo, modo: "register" });
  return `/login?${params.toString()}`;
}

export function buildPagoUrl(planId, tipo = "estudiante") {
  const params = new URLSearchParams({ plan: planId, tipo });
  return `/pago?${params.toString()}`;
}

export function parseCheckoutParams(searchParams) {
  const planId = searchParams.get("plan");
  const tipo = searchParams.get("tipo") || "estudiante";
  if (!planId || planId === "gratuito") return null;
  return { planId, tipo };
}

/** Enlace del botón de un plan: gratis → registro; de pago → crear cuenta y luego pagar */
export function planCtaUrl(plan, tipo = "estudiante") {
  if (plan.isFree) {
    return "/login?modo=register&tipo=estudiante";
  }
  return buildLoginForPlan(plan.id, tipo);
}
