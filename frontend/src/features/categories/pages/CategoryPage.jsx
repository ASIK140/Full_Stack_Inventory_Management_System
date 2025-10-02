import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductTable from "../components/CategoryTable";
import ProductForm from "../components/CategoryForm";
import {
  loadCategories,
  editCategory,
  addCategory,
  removeCategory,
} from "../slice/categorySlice";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.category);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadCategories());
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
      dispatch(removeCategory(product._id));
    }
  };

  const handleSubmit = (form) => {
    if (editing) {
      dispatch(editCategory({ id: editing._id, payload: form }));
    } else {
      dispatch(addCategory(form));
    }
    setShowForm(false);
  };
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Category</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!showForm && (
        <ProductTable
          categories={items}
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
