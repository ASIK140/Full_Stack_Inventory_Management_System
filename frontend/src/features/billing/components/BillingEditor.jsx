import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../slices/billingSlice";
import { useState } from "react";

export default function BillEditor({ products }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.billing.items);

  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (!selected) return;
    dispatch(addItem({ productId: selected, qty: Number(qty) }));
    setSelected("");
    setQty(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} (${p.price})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="w-20 border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="divide-y">
        {items.map((i) => {
          const product = products.find((p) => p._id === i.productId);
          return (
            <li key={i.productId} className="flex justify-between py-2">
              <span>
                {product?.name} x {i.qty}
              </span>
              <button
                onClick={() => dispatch(removeItem(i.productId))}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
