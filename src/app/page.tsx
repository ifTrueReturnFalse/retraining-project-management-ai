import { redirect, RedirectType } from "next/navigation";
import routes from "@/utils/routes";

export default function Home() {
  redirect(routes.DASHBOARD, RedirectType.replace)
}
