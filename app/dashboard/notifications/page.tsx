import NotificationList from "@/src/features/notifications/components/NotificationList";
import { notificationService } from "@/src/features/notifications/services/NotificationService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Tus notificaciones";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};

export default async function NotificationPage() {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/login");

  const notifications = await notificationService.getUserNotification(
    session.user.id,
  );

  return (
    <>
      <Heading>{title}</Heading>

      <NotificationList notifications={notifications} />
    </>
  );
}
