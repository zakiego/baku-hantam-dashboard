"use client";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/listbox";

import type { actionGetTopics } from "@/app/dashboard/(internal)/topics/actions";
import { actionAddTweet } from "@/app/dashboard/(internal)/tweets/actions";
import {
  type SchemaAddTweet,
  schemaAddTweet,
} from "@/app/dashboard/(internal)/tweets/schema";
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

interface DialogAddTweetProps {
  topics: Awaited<ReturnType<typeof actionGetTopics>>;
}

export function DialogAddTweet({ topics }: DialogAddTweetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState, reset, setValue } =
    useForm<SchemaAddTweet>({
      resolver: zodResolver(schemaAddTweet),
      reValidateMode: "onChange",
    });

  const onSubmit = handleSubmit(async (data) => {
    const resp = await actionAddTweet(data);
    console.log(resp);
    if (!resp.ok) {
      toast.error(resp.message);
      return;
    }

    toast.success(resp.message);
    setIsOpen(false);
  });

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add Tweet
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Tweet</DialogTitle>
        <DialogDescription>
          Fill in the details for the new topic you want to add. Make sure the
          information is clear and concise.
        </DialogDescription>
        <DialogBody className="space-y-4">
          <Field>
            <Label>URL</Label>
            <Input placeholder="Enter the tweet URL" {...register("url")} />
            {formState.errors.url?.message && (
              <ErrorMessage>
                {formState.errors.url?.message.toString()}
              </ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Topics</Label>
            <Listbox
              name="status"
              onChange={(value) => setValue("topicId", value as string)}
            >
              {topics.map((topic) => (
                <ListboxOption key={topic.id} value={topic.id}>
                  <ListboxLabel>{topic.title}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
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
          >
            {formState.isSubmitting ? "Adding..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// interface DialogEditTopicProps {
//   data: Awaited<ReturnType<typeof actionGetTopicById>>;
// }

// export function DialogEditTopic(props: DialogEditTopicProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const { register, handleSubmit, formState, reset } = useForm<SchemaAddTopic>({
//     resolver: zodResolver(schemaAddTopic),
//     reValidateMode: "onChange",
//     defaultValues: {
//       title: props.data.title,
//       slug: props.data.slug,
//       description: props.data.description,
//     },
//   });

//   const onSubmit = handleSubmit(async (data) => {
//     const resp = await actionUpdateTopic(props.data.id, data);
//     toast.success(resp);
//     reset();
//   });

//   return (
//     <>
//       <Button type="button" onClick={() => setIsOpen(true)}>
//         Edit
//       </Button>
//       <Dialog open={isOpen} onClose={setIsOpen}>
//         <DialogTitle>Edit Topic</DialogTitle>
//         <DialogDescription>
//           Fill in the details for the new topic you want to add. Make sure the
//           information is clear and concise.
//         </DialogDescription>
//         <DialogBody className="space-y-4">
//           <Field>
//             <Label>Title</Label>
//             <Input placeholder="Enter the topic title" {...register("title")} />
//             {formState.errors.title?.message && (
//               <ErrorMessage>
//                 {formState.errors.title?.message.toString()}
//               </ErrorMessage>
//             )}
//           </Field>

//           <Field>
//             <Label>Slug</Label>
//             <Input
//               placeholder="Enter a unique slug for the topic"
//               {...register("slug")}
//             />
//             {formState.errors.slug?.message && (
//               <ErrorMessage>
//                 {formState.errors.slug?.message.toString()}
//               </ErrorMessage>
//             )}
//           </Field>

//           <Field>
//             <Label>Description</Label>
//             <Input
//               placeholder="Briefly describe the topic"
//               {...register("description")}
//             />
//             {formState.errors.description?.message && (
//               <ErrorMessage>
//                 {formState.errors.description?.message.toString()}
//               </ErrorMessage>
//             )}
//           </Field>
//         </DialogBody>
//         <DialogActions>
//           <Button plain onClick={() => setIsOpen(false)}>
//             Cancel
//           </Button>
//           <Button
//             disabled={!formState.isValid || formState.isSubmitting}
//             onClick={() => {
//               onSubmit();
//               setIsOpen(false);
//             }}
//           >
//             {formState.isSubmitting ? "Updating..." : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
