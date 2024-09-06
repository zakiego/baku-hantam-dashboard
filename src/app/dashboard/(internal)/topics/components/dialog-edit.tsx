'use client'

import {
  actionAIGenerateSummary,
  type actionGetTopicById,
  actionUpdateTopic,
} from '@/app/dashboard/(internal)/topics/actions'
import { type SchemaAddTopic, schemaAddTopic } from '@/app/dashboard/(internal)/topics/schema'
import { BadgeDevelopment } from '@/components/badge-development'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { ErrorMessage, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface DialogEditTopicProps {
  data: Awaited<ReturnType<typeof actionGetTopicById>>
}

export function DialogEditTopic(props: DialogEditTopicProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit, formState, reset } = useForm<SchemaAddTopic>({
    resolver: zodResolver(schemaAddTopic),
    reValidateMode: 'onChange',
    defaultValues: {
      title: props.data.title,
      slug: props.data.slug,
      description: props.data.description,
      createdAt: props.data.createdAt.toISOString().split('T')[0],
      summary: props.data.summary || '',
      summary_ai: props.data.summary_ai || '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const { ok, message } = await actionUpdateTopic(props.data.id, data)
    if (!ok) {
      toast.error(message)
      return
    }
    setIsOpen(false)
    toast.success(message)
    reset()
  })

  const [isLoadingSummary, setIsLoadingSummary] = useState(false)

  const generateSummary = async () => {
    setIsLoadingSummary(true)
    const resp = await actionAIGenerateSummary(props.data.id)
    setIsLoadingSummary(false)
    reset({ summary_ai: resp })
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Edit Topic</DialogTitle>
        <DialogDescription>
          Fill in the details for the new topic you want to add. Make sure the information is clear and concise.
        </DialogDescription>
        <DialogBody className="space-y-4">
          <Field>
            <Label>Title</Label>
            <Input placeholder="Enter the topic title" {...register('title')} />
            {formState.errors.title?.message && (
              <ErrorMessage>{formState.errors.title?.message.toString()}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Slug</Label>
            <Input placeholder="Enter a unique slug for the topic" {...register('slug')} />
            {formState.errors.slug?.message && <ErrorMessage>{formState.errors.slug?.message.toString()}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Description</Label>
            <Input placeholder="Briefly describe the topic" {...register('description')} />
            {formState.errors.description?.message && (
              <ErrorMessage>{formState.errors.description?.message.toString()}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>
              Summary <BadgeDevelopment />
            </Label>

            <Textarea placeholder="Provide a concise summary of the topic" {...register('summary')} />
            {formState.errors.summary?.message && (
              <ErrorMessage>{formState.errors.summary?.message.toString()}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>
              Summary AI <BadgeDevelopment />
            </Label>
            <Textarea placeholder="AI-generated summary of the topic" {...register('summary_ai')} />
            {formState.errors.summary_ai?.message && (
              <ErrorMessage>{formState.errors.summary_ai?.message.toString()}</ErrorMessage>
            )}
            <Button className="mt-2" onClick={() => generateSummary()} disabled={isLoadingSummary}>
              {isLoadingSummary ? 'Generating...' : 'Generate Summary'}
            </Button>
          </Field>

          <Field>
            <Label>Created At</Label>
            <Input type="date" placeholder="Enter the date the topic was created" {...register('createdAt')} />
            {formState.errors.createdAt?.message && (
              <ErrorMessage>{formState.errors.createdAt?.message.toString()}</ErrorMessage>
            )}
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!formState.isValid || formState.isSubmitting}
            onClick={() => {
              onSubmit()
            }}
          >
            {formState.isSubmitting ? 'Updating...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
