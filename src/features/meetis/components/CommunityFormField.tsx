import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";

const communitiesPromise = fetch("/api/user/communities").then((resp) =>
  resp.json(),
);

function CommunityOption() {
  const communities = use<{ id: string; name: string }[]>(communitiesPromise);
  return (
    <>
      <FormLabel>Comunidad Label</FormLabel>
      <FormSelect>
        <option value={""}>Selecciona una comunidad</option>
        {communities.map((community) => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </FormSelect>
    </>
  );
}

export default function CommunityFormField() {
  return (
    <Suspense fallback={"Cargando comunidades..."}>
      <CommunityOption />
    </Suspense>
  );
}
