
import { meetiService } from '@/src/features/meetis/services/MeetiServices';
import Heading from '@/src/shared/components/typography/Heading';
import React from 'react'

export default async function EditMeeti(props : PageProps<'/dashboard/meetis/[id]/edit'>) {
    const { id } = await props.params;
    const meeting = await meetiService.getMeetingById(id);
    console.log(meeting);
    
  return (
    <>
        <Heading>Editar Meeti: </Heading>
    </>
  )
}
