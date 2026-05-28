import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { getBlogBySlug, blogsCatalog } from "../data/blogs";
import PlanGuard from "../Components/PlanGuard";

function BlogContent({ content }) {
  const elements = [];
  let codeLines = [];
  let inCode = false;

  content.forEach((block, index) => {
    if (block.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeLines = [];
      } else {
        inCode = false;
        elements.push(
          <pre key={`code-${index}`} className="blog-detail-code">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
      }
      return;
    }

    if (inCode) {
      codeLines.push(block);
      return;
    }

    if (block.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="blog-detail-h3">
          {block.replace("### ", "")}
        </h3>
      );
      return;
    }

    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    elements.push(
      <p key={index} className="blog-detail-p">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
      </p>
    );
  });

  return <>{elements}</>;
}

export default function BlogDetalle() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-not-found">
          <h1>Artículo no encontrado</h1>
          <Link to="/blogs" className="landing-btn landing-btn--primary">
            <ArrowLeft size={18} /> Volver a blogs
          </Link>
        </div>
      </div>
    );
  }

  const related = blogsCatalog
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <PlanGuard access="blogs">
    <article className="blog-detail-page">
      <div
        className="blog-detail-hero"
        style={{ background: `linear-gradient(135deg, ${blog.accent}dd, ${blog.accent}99)` }}
      >
        <div className="blog-detail-hero-inner">
          <Link to="/blogs" className="blog-detail-back">
            <ArrowLeft size={18} /> Todos los artículos
          </Link>
          <span className="blog-detail-category">{blog.category}</span>
          <h1>{blog.title}</h1>
          <div className="blog-detail-meta">
            <span>
              <User size={16} /> {blog.author}
            </span>
            <span>
              <Clock size={16} /> {blog.readTime} · {blog.date}
            </span>
          </div>
        </div>
      </div>

      <div className="blog-detail-layout">
        <div className="blog-detail-content">
          <p className="blog-detail-lead">{blog.excerpt}</p>
          <div className="blog-detail-body">
            <BlogContent content={blog.content} />
          </div>
          <div className="blog-detail-tags">
            <Tag size={16} />
            {blog.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="blog-detail-author-box">
            <div className="blog-detail-author-avatar">{blog.author.charAt(0)}</div>
            <div>
              <strong>{blog.author}</strong>
              <span>{blog.authorRole}</span>
            </div>
          </div>
        </div>

        <aside className="blog-detail-sidebar">
          <div className="blog-detail-sidebar-card">
            <h3>Artículos relacionados</h3>
            {related.length === 0 ? (
              <p className="blog-detail-sidebar-empty">Explora más en el catálogo.</p>
            ) : (
              <ul>
                {related.map((r) => (
                  <li key={r.id}>
                    <Link to={`/blogs/${r.slug}`}>{r.title}</Link>
                    <small>{r.readTime}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/cursos" className="landing-btn landing-btn--primary blog-detail-cta">
            Explorar cursos
          </Link>
        </aside>
      </div>
    </article>
    </PlanGuard>
  );
}
