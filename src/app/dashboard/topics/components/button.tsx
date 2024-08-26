"use client";

import { actionDeleteTopic } from "@/app/dashboard/topics/actions";
import { Button } from "@/components/button";
import { toast } from "sonner";

import { TrashIcon } from "@heroicons/react/16/solid";
import { redirect } from "next/navigation";
import { useState } from "react";

export const ButtonDeleteTopic = (props: { id: string }) => {
  return (
    <Button
      outline
      onClick={async () => {
        const resp = await actionDeleteTopic(props.id);
        toast.success(resp);
      }}
      className="text-red-500"
    >
      <TrashIcon className="size-4 fill-red-500" />
      Delete
    </Button>
  );
};
