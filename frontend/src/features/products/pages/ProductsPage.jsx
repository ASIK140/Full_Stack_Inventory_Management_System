import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProducts,
  removeProduct,
  editProduct,
  addProduct,
} from "../slices/productsSlice";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Delete ${product.name}?`)) {
      dispatch(removeProduct(product._id));
    }
  };
  const handleSubmit = (form) => {
    if (editing) {
      dispatch(editProduct({ id: editing._id, payload: form }));
      dispatch(loadProducts());
    } else {
      dispatch(addProduct(form));
    }
    dispatch(loadProducts());
    setShowForm(false);
  };
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!showForm && (
        <ProductTable
          products={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <ProductForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
