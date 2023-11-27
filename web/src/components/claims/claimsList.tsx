/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Claim } from '@tpoai/data-commons';
import { getCurrentUser } from '@/utils/auth';
import { DeleteClaimRequest } from '@/requests/claims.requests';
import { useState } from 'react';
import UpdateClaimsModal from './updateClaimsModal';
import { claimStatusList } from '@/utils/claimStatus';
import ReadClaimsModal from './readClaimsModal';

interface IClaimList {
  list?: Partial<Claim>[];
}

export default function ClaimsList({ list }: React.PropsWithRef<IClaimList>) {
  const [openUM, setOpenUM] = useState<false | Claim>(false);
  const [openDM, setOpenDM] = useState<false | Claim>(false);
  const user = getCurrentUser();
  const values = list;

  const reloadPage = () => location.reload();

  const deleteV = (row: Claim) => {
    return DeleteClaimRequest(row.id)
      .then(() => reloadPage())
      .catch(console.error);
  };

  if (!values || !values.length)
    return (
      <span>
        <i>No se encontraron comodidades.</i>
      </span>
    );

  return (
    <Box sx={{ width: '100%' }}>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '40px',
          // the number is the amount of the header rows.
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          // background needs to have transparency to show the scrolling shadows
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          background: (
            theme
          ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition:
            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
          backgroundColor: 'background.surface',
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            '& tr > *:first-of-type': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--TableCell-borderColor)',
              bgcolor: 'background.surface',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Identificador</th>
              <th style={{ width: 200 }}>Usuario</th>
              <th style={{ width: 200 }}>Status</th>
              <th style={{ width: 200 }}>Entidad</th>
              <th style={{ width: 200 }}>Última actualización</th>
              <th aria-label="last" style={{ width: 'var(--Table-lastColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {values.map((row: any) => (
              <tr key={row?.id}>
                <td>{row?.id}</td>
                <td>{row?.user?.name || row?.user?.username}</td>
                <td>{claimStatusList.find((cs) => cs.value === row?.claimStatus)?.label ?? '-'}</td>
                <td>
                  {row?.amenity
                    ? `${row.amenity.name} (${row.amenity.Building.address})`
                    : `Unidad "${row.unit.code}" (${row.unit.Building.address})`}
                </td>
                <td>{row?.updatedAt === row?.createdAt ? '-' : new Date(row.updatedAt ?? 0).toLocaleString()}</td>
                {
                  <td>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                      {/*
                    <Button size="sm" variant="plain" color="neutral">
                      Editar
                    </Button> 
                    */}

                      <Button onClick={() => setOpenDM(row)} size="sm" variant="soft" color="primary">
                        Ver detalles
                      </Button>
                      {user?.isAdmin && (
                        <>
                          <Button onClick={() => setOpenUM(row)} size="sm" variant="soft" color="warning">
                            Actualizar
                          </Button>

                          <Button onClick={() => deleteV(row as any)} size="sm" variant="soft" color="danger">
                            Borrar
                          </Button>
                          <UpdateClaimsModal open={openUM} setOpen={setOpenUM} claim={row} />
                        </>
                      )}
                      <ReadClaimsModal open={openDM} setOpen={setOpenDM} claim={row} />
                    </Box>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
