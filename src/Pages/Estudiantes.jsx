export default function Estudiantes() {
  const plans = [
    { title: 'Básico', price: '$10', period: 'mes', desc: 'Acceso a contenidos básicos' },
    { title: 'Premium', price: '$20', period: 'mes', desc: 'Cursos ilimitados y recursos extra' },
    { title: 'Anual', price: '$100', period: 'año', desc: 'Ahorra y accede todo el año' },
  ];

  return (
    <div className="main students-page">
      <h1 className="students-title">Precios para estudiantes</h1>

      <div className="plans-grid">
        {plans.map((p) => (
          <article key={p.title} className="plan-card">
            <h2 className="plan-title">{p.title}</h2>
            <div className="plan-price">
              <span className="amount">{p.price}</span>
              <span className="period">/{p.period}</span>
            </div>
            <p className="plan-desc">{p.desc}</p>
            <button className="plan-cta">Elegir plan</button>
          </article>
        ))}
      </div>
    </div>
  );
}
