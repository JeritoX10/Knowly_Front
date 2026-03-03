function Cursos() {
  const courses = [
    { name: 'Introducción a JavaScript', price: '$49' },
    { name: 'React para principiantes', price: '$59' },
    { name: 'Desarrollo con Node.js', price: '$69' },
    { name: 'Python básico', price: '$39' },
    { name: 'Ciberseguridad esencial', price: '$79' },
  ];

  return (
    <div className="main">
      <h2>Cursos</h2>
      <div className="Cards-container">
        {courses.map((c) => (
          <div key={c.name} className="Card">
            {/* placeholder for future course image */}
            <div className="Card__img" />
            <h3 className="Card__title">{c.name}</h3>
            <p className="Card__price">{c.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;