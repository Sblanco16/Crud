import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useRef, useEffect } from 'react';


const tabla = () => {
    const data = [
        { id: 1, nombre: "Sharith", apellido: "Blanco" },
        { id: 2, nombre: "Juan", apellido: "Morelo" },
        { id: 3, nombre: "Alejandra", apellido: "Gonzales" },
        { id: 4, nombre: "Daniel", apellido: "Vazques" }
    ];
    // hooks
    const [lista, setLista] = React.useState(data)
    const [listanuevo, setlistanuevo] = React.useState({ id: 0, nombre: "", apellido: "" })
    const [formulario_editar, setformulario_editar] = React.useState(false)
    const [formulario_eliminar, setformulario_eliminar] = React.useState(false)

    const RegistrarDatos = (e) => {
        e.preventDefault();
        setlistanuevo(null);
        var dato_nuevo = listanuevo
        var lista_completa = lista
        if (dato_nuevo.id == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese su ID'

            })
            return
        }
        if (dato_nuevo.nombre.trim() == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese su NOMBRE'

            })
            return
        }
        if (dato_nuevo.apellido.trim() == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese su APELLIDO'

            })
            return
        }


        if (!existe()) {
            var agregar_dato = {
                id: dato_nuevo.id,
                nombre: dato_nuevo.nombre.trim(),
                apellido: dato_nuevo.apellido.trim()
            }
            lista_completa.push(agregar_dato)
            setLista(lista_completa);
            console.log(listanuevo)
            getfor()
        }

    }

    const nuevo = (e) => {
        const { name, value } = e.target;
        setlistanuevo((prevState) => ({
            ...prevState,
            [name]: value

        }))

    }

    const activar = (elemento, estado) => {
        setlistanuevo(elemento)
        if (estado === "editar") {
            setformulario_editar(true)
        } else {
            setformulario_eliminar(true)
        }
    }

    const editar = () => {
        var nueva_lista = lista;
        nueva_lista.map(loqueyoquiera => {
            if (loqueyoquiera.id === listanuevo.id) {
                loqueyoquiera.nombre = listanuevo.nombre.trim()
                loqueyoquiera.apellido = listanuevo.apellido.trim()
            }
        })
        setLista(nueva_lista)
        setformulario_editar(false)

    }

    const eliminar = () => {
        setLista(lista.filter(usuario => usuario.id !== listanuevo.id))
        setformulario_eliminar(false)

    }

    const existe = () => {
        for (let i = 0; i < lista.length; i++) {
            if (listanuevo.id == lista[i].id) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La ID ya existe'
                })
               
                return true
            }
           
        }
     
        return false
    }

    const getfor = () => {
        let id = document.getElementById("id")
        let name = document.getElementById("nombre")
        let lsname = document.getElementById("apellido")
        id.value = ""
        name.value = ""
        lsname.value = ""
    }

// 
    return (
        <>
            {/* //formulario */}

            <div className='container' id="formulario_ingresar">
                <h2>formulario</h2>
                <form onSubmit={RegistrarDatos}>

                    <input type="number"
                        id="id"
                        placeholder='ingrese su id'
                        className='form-control mb-3'
                        name={"id"}
                        value={setlistanuevo ? setlistanuevo.id : ""}
                        onChange={nuevo}
                    />

                    <input type="text"
                        id="nombre"
                        placeholder='ingrese su nombre'
                        className='form-control mb-3'
                        name={"nombre"}
                        value={setlistanuevo ? setlistanuevo.nombre : ""}
                        onChange={nuevo}
                    />
                    <input type="text"
                        id="apellido"
                        placeholder='ingrese su apellido'
                        className='form-control mb-3'
                        name={"apellido"}
                        value={setlistanuevo ? setlistanuevo.apellido : ""}
                        onChange={nuevo}
                    />
                    <div className='d-grid gap-2'>
                        <button className='btn btn-outline-primary' type='submit' onClick={RegistrarDatos}>Agregar Usuario</button>
                    </div>
                </form>
                <hr />
                <br />
                <h2>listado de usuarios registrados</h2>
                <br /> <br />
            </div>


            {/* //tabla */}

            <div className="tabla">
                <table className="table">
                    <thead>
                        <tr><th>ID:</th>
                            <th>NOMBRE:</th>
                            <th>APELLIDO:</th>
                            <th>ACCION:</th></tr>
                    </thead>
                    <tbody>
                        {lista.map((elemento, index) => (
                            <tr key={index}>
                                <td>{elemento.id}</td>
                                <td>{elemento.nombre}</td>
                                <td>{elemento.apellido}</td>
                                <td><button className='btn btn-outline-primary mr-3' onClick={() => activar(elemento, "editar")}>EDITAR</button>
                                <button className='btn btn-outline-danger' onClick={() => activar(elemento, "eliminar")}>ELIMINAR</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={formulario_editar}>
                <ModalHeader>
                    <div><p>EDITAR USUARIO</p></div>

                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <input type="number"
                            id="id"
                            placeholder='ingrese su id'
                            className='form-control mb-3'
                            name={"id"}
                            value={listanuevo && listanuevo.id}
                            onChange={nuevo}
                            readOnly
                        />

                        <input type="text"
                            placeholder='ingrese su nombre'
                            className='form-control mb-3'
                            name={"nombre"}
                            value={listanuevo && listanuevo.nombre}
                            onChange={nuevo}
                        />
                        <input type="text"
                            placeholder='ingrese su apellido'
                            className='form-control mb-3'
                            name={"apellido"}
                            value={listanuevo && listanuevo.apellido}
                            onChange={nuevo}
                        />

                        <button className="btn btn-primary"
                            onClick={() => editar()}>
                            Editar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => setformulario_editar(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={formulario_eliminar}>
                <ModalBody>
                    Desea eliminar a el usuario: {listanuevo && listanuevo.nombre}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setformulario_eliminar(false)}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default tabla
