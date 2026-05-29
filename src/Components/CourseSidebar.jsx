import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

export default function CourseSidebar({ course, currentLesson, setCurrentLesson }) {
  const [openIndex, setOpenIndex] = useState(0);
  const progress = 12;

  return (
    <aside className="course-sidebar">
      <div className="course-sidebar-header">
        <BookOpen size={20} />
        <h2>{course.name}</h2>
      </div>

      <div className="course-sidebar-progress">
        <div className="course-sidebar-progress-label">
          <span>Tu progreso</span>
          <span>{progress}%</span>
        </div>
        <div className="course-sidebar-progress-track">
          <div className="course-sidebar-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="course-sidebar-sections">
        {course.sections.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={section.title} className="course-sidebar-section">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="course-sidebar-section-btn"
              >
                <span>{section.title}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isOpen && (
                <div className="course-sidebar-lessons">
                  {section.lessons.map((lesson) => {
                    const active = currentLesson?.title === lesson.title;
                    return (
                      <button
                        type="button"
                        key={lesson.title}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`course-sidebar-lesson${active ? " course-sidebar-lesson--active" : ""}`}
                      >
                        {lesson.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
