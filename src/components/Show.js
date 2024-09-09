import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

const Show = () => {
    //1- Configuramos los hooks
    const [products, setProducts] = useState([])

    //2- Referenciamos a la DB de firestore
    const productsCollection = collection(db, "products")

    //3- Funcion para mostrar todos los documentos
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        //    console.log(data.docs)
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        // console.log(products)
    }

    //4- Funcion para eliminar documentos
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    //5- Funcion de confirmación para sweet alert 2
    const confirmDelete = (id) =>{
        MySwal.fire({
            title: 'Remover este producto?',
            text: 'No se podra revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor:'#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar el producto.',
            cancelButtonText: 'cancelar acción'
        }).then((result) => {
            if (result.isConfirmed){
                deleteProduct(id)
                Swal.fire(
                    'Borrado',
                    'Su producto ha sido borrado correctamente.',
                    'success'
                )
            }else{
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
    }, [])

    //7- Devolvemos vista de nuestros componentes
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>{ }
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => { confirmDelete(product.id) }} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
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