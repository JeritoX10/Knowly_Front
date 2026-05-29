import { useState, useEffect } from "react";
import { end_points } from "../Services/api";

const Administrador = () => {
    const [password, setPassword] = useState("");
    const [isAuthed, setIsAuthed] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    // Clave de acceso administrativa
    const MASTER_KEY = "1724"; 

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === MASTER_KEY) {
            setIsAuthed(true);
            fetchUsuarios();
        } else {
            alert("Clave de administrador incorrecta.");
        }
    };

    const fetchUsuarios = async () => {
        try {
            const res = await fetch(end_points.usuario);
            if (!res.ok) throw new Error("Error al obtener datos");
            const data = await res.json();
            setUsuarios(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteUsuario = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario de la base de datos?")) return;
        
        try {
            const res = await fetch(`${end_points.usuario}/${id}`, {
                method: "DELETE",
            });
            
            if (res.ok) {
                setUsuarios(usuarios.filter(u => u.ideusuario !== id));
                alert("Usuario eliminado correctamente.");
            } else {
                alert("No se pudo eliminar el usuario de la API.");
            }
        } catch (error) {
            alert("Error al intentar eliminar el registro.");
        }
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const saveEdit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${end_points.usuario}/${editingUser.ideusuario}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingUser),
            });
            
            if (res.ok) {
                setUsuarios(usuarios.map(u => u.ideusuario === editingUser.ideusuario ? editingUser : u));
                setEditingUser(null);
                alert("Datos actualizados exitosamente.");
            }
        } catch (error) {
            alert("Error al guardar los cambios.");
        }
    };

    if (!isAuthed) {
        return (
            <div className="main flex justify-center items-center min-h-[60vh]">
                <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-purple-200">
                    <h2 className="text-3xl font-black mb-6 text-center text-purple-800">Acceso Admin</h2>
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Contraseña Maestra</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-2xl outline-none transition-all text-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="bg-purple-600 text-white p-4 rounded-2xl font-bold hover:bg-purple-700 shadow-lg transition-transform active:scale-95">
                            Verificar Identidad
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="main px-6 md:px-20 text-black">
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-black text-white drop-shadow-md">Panel de Control</h1>
                    <p className="text-purple-100 text-sm mt-1">Gestionando {usuarios.length} usuarios en la API</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchUsuarios} className="bg-white/20 text-white px-4 py-2 rounded-xl font-bold hover:bg-white/40 transition flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
                        Refrescar API
                    </button>
                    <button onClick={() => setIsAuthed(false)} className="bg-red-500/20 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-500/40 transition">Salir</button>
                </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-purple-50 text-purple-800 uppercase text-xs font-bold">
                            <tr>
                                <th className="p-5">ID</th>
                                <th className="p-5">Nombre Completo</th>
                                <th className="p-5">Documento</th>
                                <th className="p-5">Correo</th>
                                <th className="p-5">Rol</th>
                                <th className="p-5 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-50">
                            {usuarios.map(user => (
                                <tr key={user.ideusuario} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-5 font-mono text-xs text-gray-500">{user.ideusuario}</td>
                                    <td className="p-5 font-bold text-gray-800">{user.nombre} {user.apellido}</td>
                                    <td className="p-5 text-gray-600">{user.documento}</td>
                                    <td className="p-5 text-gray-600">{user.correo}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${user.rol?.toUpperCase() === 'PROFESOR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="p-5 flex justify-center gap-3">
                                        <button onClick={() => handleEdit(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button onClick={() => deleteUsuario(user.ideusuario)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Eliminar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingUser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[2000] p-4">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-purple-100">
                        <h2 className="text-2xl font-black mb-6 text-gray-800">Actualizar Usuario</h2>
                        <form onSubmit={saveEdit} className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Nombre</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-xl outline-none" value={editingUser.nombre} onChange={e => setEditingUser({...editingUser, nombre: e.target.value})} required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Apellido</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-xl outline-none" value={editingUser.apellido} onChange={e => setEditingUser({...editingUser, apellido: e.target.value})} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Documento</label>
                                <input type="text" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-xl outline-none" value={editingUser.documento} onChange={e => setEditingUser({...editingUser, documento: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Correo Electrónico</label>
                                <input type="email" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-xl outline-none" value={editingUser.correo} onChange={e => setEditingUser({...editingUser, correo: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Contraseña</label>
                                <input type="text" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-xl outline-none" value={editingUser.contrasenia} onChange={e => setEditingUser({...editingUser, contrasenia: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Rol en Plataforma</label>
                                <select className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-purple-400 rounded-xl outline-none appearance-none" value={editingUser.rol} onChange={e => setEditingUser({...editingUser, rol: e.target.value})}>
                                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                                    <option value="PROFESOR">PROFESOR</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="submit" className="bg-purple-600 text-white flex-1 py-4 rounded-2xl font-bold shadow-lg hover:bg-purple-700 transition">Aplicar Cambios</button>
                                <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-100 text-gray-500 flex-1 py-4 rounded-2xl font-bold hover:bg-gray-200 transition">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Administrador;