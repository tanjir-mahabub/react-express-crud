"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"

interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    confirmText = "Yes, Delete",
    cancelText = "Cancel",
}: ConfirmDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-w-md w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-muted-foreground hover:text-foreground">
                                <X size={18} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className="text-sm text-muted-foreground mb-6">
                        {description}
                    </Dialog.Description>

                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>
                            {cancelText}
                        </Button>
                        <Button variant="destructive" onClick={() => { onConfirm(); onOpenChange(false); }}>
                            {confirmText}
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
