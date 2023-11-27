import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { closeSidebar } from '@/utils/sidebar';
import { Tooltip } from '@mui/joy';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { getCurrentUser } from '@/utils/auth';
import { getInitialsWSurname } from '@/utils/user.utils';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const user = getCurrentUser();

  return (
    <Sheet
      component="aside"
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1.1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        height: '82.5dvh',
        minHeight: '768px',
        zIndex: 100,
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 99,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Tooltip title={`Usuario autenticado: ${user?.username || '-'}`}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
        </Tooltip>
        <Typography level="title-lg">{getInitialsWSurname(user?.name) || user?.username || '********'}</Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              onClick={() => location.replace('/panel')}
              selected={location.pathname.startsWith('/panel')}
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Panel</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded={true}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Reclamos</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                {!user?.isAdmin && (
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton
                      selected={location.pathname.startsWith('/claim')}
                      onClick={() => location.replace('/claim')}
                    >
                      Generar nuevo
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem sx={user?.isAdmin ? { gap: 0.5 } : undefined}>
                  <ListItemButton onClick={() => location.replace(user?.isAdmin ? '/review' : '/panel')}>
                    Ver existentes
                  </ListItemButton>
                </ListItem>
                {user?.isAdmin && (
                  <ListItem>
                    <ListItemButton
                      selected={location.pathname.startsWith('/review')}
                      onClick={() => location.replace('/review')}
                    >
                      Administrar
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded={true}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ApartmentIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Edificios</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>[TODO] Ver todos</ListItemButton>
                </ListItem>
                {!user?.isAdmin && (
                  <ListItem>
                    <ListItemButton onClick={() => location.replace('/panel')}>Ver asignados</ListItemButton>
                  </ListItem>
                )}
                {user?.isAdmin && (
                  <>
                    <ListItem>
                      <ListItemButton
                        selected={location.pathname.startsWith('/building')}
                        onClick={() => location.replace('/building')}
                      >
                        Editar existente
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        selected={location.pathname.startsWith('/building')}
                        onClick={() => location.replace('/building')}
                      >
                        Crear nuevo
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded={true}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Usuarios</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>[TODO] Cambiar contraseña</ListItemButton>
                </ListItem>
                {user?.isAdmin && (
                  <>
                    <ListItemButton
                      selected={location.pathname.startsWith('/register')}
                      onClick={() => location.replace('/register')}
                      role="menuitem"
                      component="a"
                    >
                      Registrar nuevo
                    </ListItemButton>
                    <ListItemButton role="menuitem" component="a">
                      [TODO] Administrar
                    </ListItemButton>
                  </>
                )}
              </List>
            </Toggler>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
