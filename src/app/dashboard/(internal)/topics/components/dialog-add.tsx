"use client";

import { actionAddTopic } from "@/app/dashboard/(internal)/topics/actions";
import {
  type SchemaAddTopic,
  schemaAddTopic,
} from "@/app/dashboard/(internal)/topics/schema";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { ErrorMessage, Field, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function DialogAddTopic() {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm<SchemaAddTopic>({
    resolver: zodResolver(schemaAddTopic),
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    const { ok, message } = await actionAddTopic(data);
    if (!ok) {
      toast.error(message);
      return;
    }
    setIsOpen(false);
    toast.success(message);
    reset();
  });

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add Topic
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Topic</DialogTitle>
        <DialogDescription>
          Fill in the details for the new topic you want to add. Make sure the
          information is clear and concise.
        </DialogDescription>
        <DialogBody className="space-y-4">
          <Field>
            <Label>Title</Label>
            <Input placeholder="Enter the topic title" {...register("title")} />
            {formState.errors.title?.message && (
              <ErrorMessage>
                {formState.errors.title?.message.toString()}
              </ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Slug</Label>
            <Input
              placeholder="Enter a unique slug for the topic"
              {...register("slug")}
            />
            {formState.errors.slug?.message && (
              <ErrorMessage>
                {formState.errors.slug?.message.toString()}
              </ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Description</Label>
            <Input
              placeholder="Briefly describe the topic"
              {...register("description")}
            />
            {formState.errors.description?.message && (
              <ErrorMessage>
                {formState.errors.description?.message.toString()}
              </ErrorMessage>
            )}
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!formState.isValid || formState.isSubmitting}
            onClick={() => {
              onSubmit();
            }}
            type="button"
          >
            {formState.isSubmitting ? "Adding..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
