import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/slices/AuthSlice";

export default function AppHeader() {
  const dispatch = useDispatch();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <button
        onClick={() => dispatch(logout())}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}
