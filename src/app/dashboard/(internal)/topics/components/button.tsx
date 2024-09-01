'use client'

import { actionDeleteTopic } from '@/app/dashboard/(internal)/topics/actions'
import { Button } from '@/components/button'
import { toast } from 'sonner'

import { TrashIcon } from '@heroicons/react/16/solid'

export const ButtonDeleteTopic = (props: { id: string }) => {
  return (
    <Button
      outline
      onClick={async () => {
        const resp = await actionDeleteTopic(props.id)
        toast.success(resp)
      }}
      className="text-red-500"
    >
      <TrashIcon className="size-4 fill-red-500" />
      Delete
    </Button>
  )
}
