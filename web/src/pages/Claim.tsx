/* eslint-disable @typescript-eslint/no-explicit-any */
import PageBase from '@/components/layouts/PageBase';
import { Alert, Button, Divider, FormControl, Stack, SvgIcon, Typography, styled } from '@mui/joy';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { getCurrentUser } from '@/utils/auth';
import { FormObj, OnFormSubmission } from '@/utils/eventForm';
import { Amenity, Prisma, Unit } from '@tpoai/data-commons';
import FormInput from '@/components/forms/FormInput';
import { ChangeEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { PostClaimRequest } from '@/requests/claims.requests';
import { GetCurrentTime } from '@/utils/datetime';
import { GetBuildingsRequest } from '@/requests/buildings.requests';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function ClaimPage() {
  const user = getCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [claimId, setClaimId] = useState<number>(0);
  const [files, setFiles] = useState<FileList | unknown[] | null>([]);
  const [selections, setSelections] = useState<
    {
      value: string;
      label: string;
      data: Partial<Unit | Amenity>;
    }[]
  >([]);

  useEffect(() => {
    GetBuildingsRequest().then(({ data }) => {
      const s: any[] = [];
      data.forEach((b: any) => {
        s.push(
          ...b.units
            .filter((u: any) => {
              const uRelation = u.users.find((v: any) => v.userId === user.id);
              if (!uRelation) return false;
              if (uRelation.condition === 'OWNED' && u.users.some((v: any) => v.condition !== 'OWNED')) return false;
              return true;
            })
            .map((u: Unit) => ({
              data: u,
              value: `unit-${u.id}`,
              label: `${u.code} (${b.address})`,
            }))
        );

        s.push(
          ...b.amenities.map((a: Amenity) => ({
            data: a,
            value: `amenity-${a.id}`,
            label: `${a.name} (${b.address})`,
          }))
        );
      });

      setSelections(s);
    });
  }, [user.id]);

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => setFiles(e.target.files);

  const handleSubmit = async (f: FormObj<any>) => {
    const id: string | null = (f as any)?.selection[1]?.value;
    if (!id) return;

    setIsLoading(true);
    setError(null);

    console.log(id);
    const form: Prisma.ClaimUncheckedCreateInput = {
      userId: user.id,
      description: f.description.value,
      unitId: id.includes('unit') ? Number(id.split('-')[1]) : null,
      amenityId: id.includes('amenity') ? Number(id.split('-')[1]) : null,
      claimStatus: 'OPEN',
    };

    PostClaimRequest(form, files as FileList)
      .then(({ data }: { data: any }) => setClaimId(data.id))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return (
    <PageBase title="Generar reclamo">
      <Typography startDecorator={<AssignmentRoundedIcon />} level="h3">
        Generar reclamo
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />

      <form onSubmit={(e) => OnFormSubmission<any>(e, handleSubmit, { reset: true, preventDefault: true })}>
        <Stack spacing={1}>
          <FormInput
            disabled={!!claimId}
            name="selection"
            required
            label="Seleccione comodidad / unidad"
            selectValues={selections || []}
          />
          <FormInput
            name="description"
            label="Descripción"
            required
            multiline
            placeholder="Describa el inconveniente aquí..."
          />
          <FormControl>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Subir archivos ({files?.length || 0} seleccionados)
              <VisuallyHiddenInput onChange={fileChange} name="files" type="file" multiple />
            </Button>
          </FormControl>

          <Divider sx={{ marginBlock: '1rem !important' }} />
          <Button loading={isLoading} type="submit">
            Generar reclamo
          </Button>
        </Stack>
      </form>
      {!isLoading && (claimId != 0 || error) && (
        <Alert
          sx={{ marginBlock: 4 }}
          variant="soft"
          color={error ? 'danger' : 'success'}
          startDecorator={<AssignmentRoundedIcon />}
        >
          ({GetCurrentTime()}){' '}
          {error ? `La creación del reclamo falló.` : `Se creó el reclamo con éxito (identificador: ${claimId}).`}
        </Alert>
      )}
    </PageBase>
  );
}
