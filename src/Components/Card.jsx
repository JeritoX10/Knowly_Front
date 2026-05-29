function Card() {
    return (
        <div className="Card">

    <img className="Card__img" src="/ruta.jpg" alt="Curso" />

    <h3 
    className="Card__title">Título del curso
    </h3>

    <p 
    className="Card__desc">Descripción corta del curso
    </p>

    <button 
    className="Card__btn">Ingresar
    </button>

    </div>
    );
}

export default Card;