import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ProductsTable from '../Components/Table/ProductsTable';
import AddProductModal from '../Components/Modal/AddProductModal';
import EditProductModal from '../Components/Modal/EditProductModal';


axios.defaults.baseURL = 'http://localhost:5029';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [editProd, setEditProd] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        } catch (err) {
            console.error('[FetchProducts]', err);
            setError(err.response ? `Server ${err.response.status}` : err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        } catch (err) {
            console.error('[FetchCategories]', err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleAdd = async (payload) => {
        try {
            const { data } = await axios.post('/api/products', payload);
            setProducts(prev => [...prev, data]);
            setAddShow(false);
        } catch (err) {
            console.error('[AddProduct]', err);
            setError('Failed to add product');
        }
    };

    const handleEditClick = (prod) => {
        setEditProd(prod);
        setEditShow(true);
    };

    const handleEditSave = async (payload) => {
        try {
            const { data } = await axios.put(`/api/products/${payload.id}`, payload);
            setProducts(prev => prev.map(p => p.id === payload.id ? data : p));
            setEditShow(false);
            setEditProd(null);
        } catch (err) {
            console.error('[EditProduct]', err);
            setError('Failed to update product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('[DeleteProduct]', err);
            setError('Failed to delete product');
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-3">
                <Col>
                    <Button onClick={() => setAddShow(true)} className="me-2">
                        Add Product
                    </Button>
                    <Button variant="outline-secondary" onClick={fetchProducts}>
                        Refresh
                    </Button>
                </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <ProductsTable
                    products={products}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            )}

            <AddProductModal
                show={addShow}
                onHide={() => setAddShow(false)}
                onSave={handleAdd}
                categories={categories}
            />

            {editShow && editProd && (
                <EditProductModal
                    show={true}
                    product={editProd}
                    onHide={() => {
                        setEditShow(false);
                        setEditProd(null);
                    }}
                    onSave={handleEditSave}
                    categories={categories}
                />
            )}
        </Container>
    );
};

export default Products;
