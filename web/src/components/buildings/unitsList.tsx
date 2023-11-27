/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Unit } from '@tpoai/data-commons';
import { PatchBuildingRequest } from '@/requests/buildings.requests';
import { List, ListItem } from '@mui/joy';

interface IUnitList {
  list?: { address?: string; units?: Unit[] }[];
  actions?: boolean;
  forceBuilding?: boolean;
}

export default function UnitsList({ list, actions, forceBuilding }: React.PropsWithRef<IUnitList>) {
  const values = list
    ?.filter((b) => b.units && b.units.length)
    .flatMap((b) => b.units?.map((a) => ({ ...a, buildingAddress: b.address })));

  const reloadPage = () => location.reload();

  const deleteV = (row: Unit) => {
    return PatchBuildingRequest(row.buildingId, {
      units: {
        delete: { id: row.id },
      },
    })
      .then(() => reloadPage())
      .catch(console.error);
  };

  if (!values || !values.length)
    return (
      <span>
        <i>No se encontraron unidades.</i>
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
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Código</th>
              <th style={{ width: 200 }}>Usuarios</th>
              {((list && list?.length > 1) || forceBuilding) && <th style={{ width: 200 }}>Edificio</th>}
              {actions && <th aria-label="last" style={{ width: 'var(--Table-lastColumnWidth)' }} />}
            </tr>
          </thead>
          <tbody>
            {values.map((row: any) => (
              <tr key={row?.id}>
                <td>{row?.code || <i>No especificado</i>}</td>
                <td>
                  <List marker="disc">
                    {row?.users?.map((u: any, i: number) => (
                      <ListItem key={u?.id || i}>{`${u.User.name || u.User.username} (${
                        u.condition === 'OWNED' ? 'Propietario' : 'Inquilino'
                      })`}</ListItem>
                    )) ?? <i>No hay usuarios especificados.</i>}
                  </List>
                </td>
                {((list && list?.length > 1) || forceBuilding) && <td>{row?.buildingAddress || '-'}</td>}
                {actions && (
                  <td>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      {/*
                    <Button size="sm" variant="plain" color="neutral">
                      Editar
                    </Button> 
                    */}

                      <Button onClick={() => deleteV(row as any)} size="sm" variant="soft" color="danger">
                        Borrar
                      </Button>
                    </Box>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
