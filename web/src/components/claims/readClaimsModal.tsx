/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Claim } from '@tpoai/data-commons';
import { AspectRatio, Button, Divider, ModalClose, Stack, Typography } from '@mui/joy';
import FormInput from '../forms/FormInput';
import { claimStatusList } from '@/utils/claimStatus';

export default function ReadClaimsModal({
  open,
  setOpen,
  claim,
}: React.PropsWithRef<{ claim: Partial<Claim | any>; open: Claim | false; setOpen: (v: any) => void }>) {
  claim = !open ? claim : open;

  return (
    <Modal open={!!open} onClose={() => setOpen(false)}>
      <ModalDialog maxWidth={'50%'} size="lg" variant="soft">
        <ModalClose />
        <DialogTitle>Detalles del reclamo</DialogTitle>
        {claim?.id && (
          <DialogContent>
            Identificador "{claim.id}" | Estado: {claimStatusList.find((cs) => cs.value === claim.claimStatus)?.label}
          </DialogContent>
        )}
        <DialogContent>
          <Typography level="body-sm">
            <b>Entidad:</b>{' '}
            {claim?.amenity
              ? `${claim.amenity.name} (${claim.amenity.Building.address})`
              : `Unidad "${claim.unit.code}" (${claim.unit.Building.address})`}{' '}
            | <b>Usuario:</b> {claim?.user?.name || claim?.user?.username}
          </Typography>
          <Typography level="body-xs">
            <b>Creación:</b> {new Date(claim?.createdAt ?? 0).toLocaleString()} | <b>Última actualización:</b>{' '}
            {claim?.updatedAt !== claim?.createdAt ? new Date(claim.updatedAt ?? 0).toLocaleString() : '-'}
          </Typography>
          <FormInput
            name="lastMessage"
            label="Detalles de la última actualización"
            multiline
            minRows={1}
            disabled
            value={claim.lastMessage ?? '-'}
          />
          <Divider sx={{ marginBlock: 1 }} />
          <FormInput name="description" label="Descripción" multiline disabled value={claim.description} minRows={1} />
          <Divider sx={{ marginBlock: 2 }} />
          <Typography marginBottom={1} level="title-sm">
            Archivos adjuntos
          </Typography>
          <Stack gap={2} display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} overflow={'auto'}>
            {claim.multimedia?.map((m: string) => (
              <AspectRatio
                key={m}
                variant="outlined"
                ratio="4/3"
                sx={{
                  width: 250,
                  minWidth: 250,
                  borderRadius: 'md',
                }}
              >
                {/\.(gif|jpe?g|tiff?|png|webp|bmp|svg)$/i.test(m) ? (
                  <img
                    onClick={() => window.open(`${import.meta.env.VITE_API_URL}/public/${m}`, '_blank')}
                    style={{ cursor: 'pointer' }}
                    alt={m}
                    src={`${import.meta.env.VITE_API_URL}/public/${m}`}
                  />
                ) : (
                  <Button
                    color="neutral"
                    variant="soft"
                    sx={{ flexDirection: 'column', gap: 1 }}
                    onClick={() => window.open(`${import.meta.env.VITE_API_URL}/public/${m}`, '_blank')}
                  >
                    Descargar archivo {m}
                    <Typography level="body-xs">Previsualización no disponible</Typography>
                  </Button>
                )}
              </AspectRatio>
            ))}
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
