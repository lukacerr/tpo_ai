/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { FormObj, OnFormSubmission } from '@/utils/eventForm';
import FormInput from '../forms/FormInput';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Divider } from '@mui/joy';
import { Claim, Prisma } from '@tpoai/data-commons';
import { PatchClaimRequest } from '@/requests/claims.requests';
import { claimStatusList } from '@/utils/claimStatus';

export default function UpdateClaimsModal({
  open,
  setOpen,
  claim,
}: React.PropsWithRef<{ claim: Partial<Claim>; open: false | Claim; setOpen: (v: any) => void }>) {
  claim = !open ? claim : open;

  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setError] = useState<AxiosError | null>(null);
  const reloadPage = () => location.reload();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (f: FormObj<any>) => {
    setIsLoading(true);
    setError(null);

    const form: Prisma.ClaimUpdateInput = {
      lastMessage: f.lastMessage.value,
      claimStatus: (f as any).claimStatus[1]?.value,
    };

    return !claim?.id
      ? null
      : PatchClaimRequest(claim.id, form)
          .then(() => reloadPage())
          .catch(console.error);
  };

  return (
    <Modal open={!!open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Actualizar reclamo</DialogTitle>
        {claim?.id && <DialogContent>Identificador "{claim.id}".</DialogContent>}
        <form onSubmit={(e) => OnFormSubmission<any>(e, handleSubmit)}>
          <Stack spacing={1}>
            <FormInput
              name="claimStatus"
              required
              label="Estado"
              selectValues={claimStatusList.map((cs) => ({ ...cs, default: cs.value === claim.claimStatus }))}
            />
            <FormInput
              name="lastMessage"
              label="Mensaje"
              multiline
              required
              placeholder="Inserte las últimas actualizaciones escritas..."
            />
            <Divider sx={{ marginBlock: '1rem !important' }} />
            <Button loading={isLoading} type="submit">
              Actualizar reclamo
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
