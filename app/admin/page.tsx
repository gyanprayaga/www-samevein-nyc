import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin-editor";
import { isAdminSession } from "@/lib/admin";
import { getContent } from "@/lib/content";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }
  const content = await getContent();
  return <AdminEditor initial={content} />;
}
