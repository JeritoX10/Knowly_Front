import {
  getCurrentUser,
  canAccessPremiumContent,
  canAccessCourseContent,
  canAccessBlogs,
  canAccessProfesorPanel,
} from "../Helpers/plan-access";
import MembershipGate from "./MembershipGate";
import UpgradeGate from "./UpgradeGate";

/**
 * @param {"premium"|"course"|"blogs"|"profesor"} access
 * @param {string} feature - clave para mensajes (certificados, contacto, vista, etc.)
 */
export default function PlanGuard({ access = "premium", feature, children, courseName }) {
  const usuario = getCurrentUser();

  const gateFeature =
    access === "blogs"
      ? "blogs"
      : access === "course"
        ? "vista"
        : access === "profesor"
          ? "profesor"
          : feature || "default";

  if (access === "blogs") {
    if (!canAccessBlogs(usuario)) {
      return <MembershipGate feature="blogs" />;
    }
    return children;
  }

  if (access === "profesor") {
    if (!usuario) {
      return <MembershipGate feature="profesor" />;
    }
    if (!canAccessProfesorPanel(usuario)) {
      return <UpgradeGate feature="profesor" userRol="profesor" />;
    }
    return children;
  }

  if (access === "course") {
    if (!usuario) {
      return <MembershipGate feature="vista" courseName={courseName} />;
    }
    if (!canAccessCourseContent(usuario)) {
      return (
        <UpgradeGate
          feature="vista"
          userRol={usuario.rol || "estudiante"}
          courseName={courseName}
        />
      );
    }
    return children;
  }

  if (!usuario) {
    return <MembershipGate feature={gateFeature} courseName={courseName} />;
  }

  if (!canAccessPremiumContent(usuario)) {
    return <UpgradeGate feature={feature} userRol={usuario.rol || "estudiante"} />;
  }

  return children;
}
