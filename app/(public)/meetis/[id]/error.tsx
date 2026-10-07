'use client'

import Heading from "@/src/shared/components/typography/Heading";

export default function ErrorPage({error} : { error: Error & { digest?: string}}) {
  return (
    <div className="py-10 text-center">
        <Heading>Error...</Heading>
        <p>{error.message}</p>
    </div>
  )
}