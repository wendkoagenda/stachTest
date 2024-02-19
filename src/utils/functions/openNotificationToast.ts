import { ToastActionElement } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function NotificationToast() {
  const { toast } = useToast();

  function openNotification(
    title?: string,
    titleAndIcon?: React.ReactNode,
    description?: React.ReactNode,
    action?: ToastActionElement
  ) {
    toast({
      title: title,
      titleAndIcon: titleAndIcon,
      description: description,
      action: action,
    });
  }

  return { openNotification };
}
