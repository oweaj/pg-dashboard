import { Badge } from "@/components/ui/badge";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconExclamationCircleFilled,
  IconCircleHalfVertical,
  IconLoader,
} from "@tabler/icons-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "SUCCESS":
    case "ACTIVE":
      return {
        icon: (
          <IconCircleCheckFilled
            data-testid="check-state-icon"
            style={{ width: 16, height: 16 }}
            className="fill-green-500 dark:fill-green-400"
          />
        ),
        description: status === "SUCCESS" ? "결제완료" : "활성",
      };

    case "FAILED":
    case "CLOSED":
      return {
        icon: (
          <IconCircleXFilled
            data-testid="reject-state-icon"
            style={{ width: 16, height: 16 }}
            className="fill-red-500 dark:fill-red-400"
          />
        ),
        description: status === "FAILED" ? "결제실패" : "폐기",
      };

    case "CANCELLED":
    case "INACTIVE":
      return {
        icon: (
          <IconExclamationCircleFilled
            data-testid="warn-state-icon"
            style={{ width: 16, height: 16 }}
            className="fill-yellow-500 dark:fill-yellow-400"
          />
        ),
        description: status === "CANCELLED" ? "환불완료" : "중지",
      };

    case "PENDING":
    case "READY":
      return {
        icon: <IconLoader data-testid="wait-state-icon" style={{ width: 16, height: 16 }} />,
        description: status === "PENDING" ? "결제대기" : "대기",
      };

    default:
      return {
        icon: <IconCircleHalfVertical data-testid="default-state-icon" style={{ width: 16, height: 16 }} />,
        description: "알수없음",
      };
  }
};

// 테이블 별 상태 뱃지
const TableStatusBadge = ({ status }: { status: string }) => {
  const { icon, description } = getStatusColor(status);

  return (
    <Badge variant="outline" className="text-muted-foreground py-1 flex items-center gap-1">
      {icon}
      {description}
    </Badge>
  );
};

export default TableStatusBadge;
