function Blogs() {
  const blogs = [
    { 
      title: 'Métodos de aprendizaje efectivos', 
      category: 'Métodos de Aprendizaje',
      description: 'Descubre técnicas probadas para mejorar tu retención y comprensión'
    },
    { 
      title: 'Herramientas para desarrolladores', 
      category: 'Herramientas',
      description: 'Las mejores herramientas para optimizar tu flujo de trabajo'
    },
    { 
      title: 'Técnica Pomodoro', 
      category: 'Métodos de Aprendizaje',
      description: 'Aprende a gestionar tu tiempo de estudio de manera efectiva'
    },
    { 
      title: 'Git y GitHub', 
      category: 'Herramientas',
      description: 'Controla tus versiones y colabora en proyectos fácilmente'
    },
    { 
      title: 'Mapas mentales', 
      category: 'Métodos de Aprendizaje',
      description: 'Organiza tus ideas y conceptos de forma visual'
    },
    { 
      title: 'VS Code', 
      category: 'Herramientas',
      description: 'Configura y domina el editor de código más popular'
    },
  ];

  return (
    <div className="main">
      <h2>Blogs</h2>
      <p className="subtitle">Métodos de aprendizaje y herramientas para tu desarrollo</p>
      <div className="Cards-container">
        {blogs.map((blog) => (
          <div key={blog.title} className="Card">
            {/* placeholder for future blog image */}
            <div className="Card__img" />
            <span className="Card__category">{blog.category}</span>
            <h3 className="Card__title">{blog.title}</h3>
            <p className="Card__description">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
