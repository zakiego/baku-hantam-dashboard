'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useState } from 'react'

export function DialogAddTweet() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Insert Tweet
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Tweet</DialogTitle>
        <DialogDescription>Paste the link to the tweet you want to embed in your content.</DialogDescription>
        <DialogBody>
          <Field>
            <Label>Link</Label>
            <Input name="tweetLink" placeholder="https://twitter.com/username/status/1234567890" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
