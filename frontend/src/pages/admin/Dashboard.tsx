import AdminLayout from "../../shared/layouts/AdminLayout";

const DashboardPage = () => {
  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back, Admin">
      <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
        <p className="text-lg text-slate-500">
          Dashboard content coming soon...
        </p>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
