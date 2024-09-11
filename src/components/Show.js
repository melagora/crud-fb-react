import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

const Show = () => {
    //1- Configuramos los hooks
    const [products, setProducts] = useState([])

    //2- Referencia a la colección de productos en Firestore
    const productsCollection = collection(db, "products")

    //3- Función para obtener todos los productos de Firestore
    const getProducts = async () => {
        //Realiza una consulta a la base de datos y actualiza el estado con los resultados
        const data = await getDocs(productsCollection)
        //    console.log(data.docs)
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        // console.log(products)
    }

    //4- Función para eliminar un producto de Firestore
    const deleteProduct = async (id) => {
        //Elimina el documento con el ID especificado y actualiza la lista de productos
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    //5- Funcion de confirmación para sweet alert 2 para la hora de eliminar algún producto
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Remover este producto?',
            text: 'No se podra revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar el producto.',
            cancelButtonText: 'cancelar acción'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire(
                    'Borrado',
                    'Su producto ha sido borrado correctamente.',
                    'success'
                )
            } else {
                Swal.fire(
                    'Accion cancelada',
                    'No se ha borrado el producto',
                    'error'
                )
            }
        })
    }

    //6- Usamos useEffect
    useEffect(() => {
        getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //7- Devolvemos vista de nuestros componentes
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Guardar un nuevo producto</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>{ }
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} title="Editar" className='btn btn-light'><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => confirmDelete(product.id)} title="Borrar" className='btn btn-danger'>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show