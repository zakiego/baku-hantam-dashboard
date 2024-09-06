"use client";

import { actionDeleteTopic } from "@/app/dashboard/(internal)/topics/actions";
import {
  Alert,
  AlertActions,
  AlertBody,
  AlertDescription,
  AlertTitle,
} from "@/components/alert";
import { Button } from "@/components/button";
import { Field, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { TrashIcon } from "@heroicons/react/16/solid";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ButtonDeleteTopic = (props: { id: string; slug: string }) => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleDelete = async () => {
    const { message, ok } = await actionDeleteTopic(props.id);
    if (!ok) {
      toast.error(message);
      return;
    }

    toast.success(message);
    push("/dashboard/topics");
  };

  return (
    <>
      <Button
        outline
        onClick={async () => {
          setIsOpen(true);
        }}
        className="text-red-500"
      >
        <TrashIcon className="size-4 fill-red-500" />
        Delete
      </Button>
      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>Are you sure you want to delete this topic?</AlertTitle>
        <AlertDescription>
          This action cannot be undone. This will permanently delete the topic
          (without deleting the tweets).
        </AlertDescription>
        <AlertBody>
          <Field>
            <Label>
              Please type{" "}
              <span className="font-bold underline">{props.slug}</span> to
              confirm
            </Label>
            <Input onChange={(e) => setValue(e.target.value)} />
          </Field>
        </AlertBody>
        <AlertActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={value !== props.slug}
            color="red"
            onClick={() => {
              handleDelete();
            }}
            type="button"
          >
            Delete
          </Button>
        </AlertActions>
      </Alert>
    </>
  );
};
