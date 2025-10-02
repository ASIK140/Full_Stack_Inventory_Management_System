import { useSelector } from "react-redux";
import BillEditor from "../components/BillingEditor";
import BillPreview from "../components/BillingPreview";

export default function BillingPage() {
  const products = useSelector((s) => s.products.items);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Billing</h2>
      <BillEditor products={products} />
      <BillPreview products={products} />
    </div>
  );
}
