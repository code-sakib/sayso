import { redirect } from "next/navigation";
import { MAIN_BRANCH } from "@/components/store/branches";

export default function DashboardHome() {
  redirect(`/dashboard/${MAIN_BRANCH.id}`);
}
