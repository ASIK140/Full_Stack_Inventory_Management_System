export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Price</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Category</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p._id} className="border-t">
            <td className="p-2">{p.name}</td>
            <td className="p-2">₹{p.price}</td>
            <td className="p-2">{p.stock}</td>
            <td className="p-2">{p.category.name}</td>

            <td className="p-2 space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
