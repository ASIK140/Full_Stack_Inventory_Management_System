import { useDispatch, useSelector } from "react-redux";
import { createBill } from "../slices/billingSlice";

export default function BillPreview({ products }) {
  const dispatch = useDispatch();
  const { items, bill, loading } = useSelector((s) => s.billing);

  const total = items.reduce((sum, i) => {
    const product = products.find((p) => p._id === i.productId);
    return sum + (product?.price || 0) * i.qty;
  }, 0);

  const handleGenerate = () => {
    dispatch(createBill({ items }));
  };

  return (
    <div className="mt-6 p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-2">Bill Preview</h3>
      <p>Total: ${total.toFixed(2)}</p>
      <button
        onClick={handleGenerate}
        disabled={loading || items.length === 0}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Bill"}
      </button>

      {bill && (
        <div className="mt-4 border-t pt-2">
          <p className="font-semibold">Bill ID: {bill.billId}</p>
          <p>Total: ${bill.total}</p>
        </div>
      )}
    </div>
  );
}
