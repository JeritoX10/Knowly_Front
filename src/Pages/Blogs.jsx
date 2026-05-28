import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { blogsCatalog } from "../data/blogs";
import PlanGuard from "../Components/PlanGuard";

const categories = ["Todos", ...new Set(blogsCatalog.map((b) => b.category))];

function Blogs() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return blogsCatalog;
    return blogsCatalog.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  return (
    <PlanGuard access="blogs">
    <div className="blogs-page">
      <header className="blogs-header">
        <BookOpen size={32} className="blogs-header-icon" />
        <h1>Blog Knowly</h1>
        <p>
          Artículos sobre aprendizaje, herramientas para developers y consejos de carrera escritos
          por nuestro equipo e instructores.
        </p>
        <div className="blogs-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`courses-category-pill${activeCategory === cat ? " courses-category-pill--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="blogs-grid">
        {filtered.map((blog) => (
          <article key={blog.id} className="blog-card">
            <div
              className="blog-card-cover"
              style={{ background: `linear-gradient(145deg, ${blog.accent}ee, ${blog.accent}88)` }}
            >
              <span className="blog-card-category">{blog.category}</span>
              <span className="blog-card-time">
                <Clock size={14} /> {blog.readTime}
              </span>
            </div>
            <div className="blog-card-body">
              <h2>
                <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p>{blog.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-card-author">
                  <User size={14} /> {blog.author}
                </span>
                <span className="blog-card-date">{blog.date}</span>
              </div>
              <Link to={`/blogs/${blog.slug}`} className="blog-card-read">
                Leer artículo <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
    </PlanGuard>
  );
}

export default Blogs;
