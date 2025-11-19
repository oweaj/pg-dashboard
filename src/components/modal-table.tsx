"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import clsx from "clsx";

interface ITableModalProps {
  open: boolean;
  size?: string;
  title: string;
  content: React.ReactNode;
  setOpen: (open: boolean) => void;
}

const TableModal = ({ open, size, title, content, setOpen }: ITableModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={clsx("gap-6 rounded-lg p-6", size)} onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">{title}</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription asChild className="text-base text-black scrollbar-hide">
          <div className="flex justify-center overflow-auto">{content}</div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TableModal;
