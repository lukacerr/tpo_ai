import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { List, ListItem, Sheet, Stack, Tooltip, useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

import { Box, Typography } from '@mui/joy';
import { hasAuthToken, removeAuth } from '@/utils/auth';
import { toggleSidebar } from '@/utils/sidebar';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Box
        component="header"
        sx={{
          py: 3,
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ display: { xs: 'auto', md: 'none' } }}
            onClick={() => toggleSidebar()}
            variant="outlined"
            color="neutral"
            size="sm"
          >
            <MenuIcon />
          </IconButton>
          <Tooltip
            title={
              <Box padding={1}>
                <Typography fontWeight="bold" fontSize="lg">
                  Integrantes
                </Typography>
                <List marker="disc">
                  <ListItem>Cerrutti Luka</ListItem>
                  <ListItem>González Francisco Ezequiel</ListItem>
                  <ListItem>Caceres Augusto</ListItem>
                  <ListItem>Monti Nahuel Matías</ListItem>
                  <ListItem>Gómez José Francisco</ListItem>
                </List>
              </Box>
            }
          >
            <IconButton variant="soft" color="primary" size="sm">
              <BadgeRoundedIcon />
            </IconButton>
          </Tooltip>
          <Typography level="title-lg">TPO AI - Grupo 3</Typography>
        </Box>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} paddingInline={2}>
          {hasAuthToken() && (
            <IconButton size="sm" variant="outlined" color="neutral" onClick={() => removeAuth()}>
              <LogoutIcon />
            </IconButton>
          )}
          <ColorSchemeToggle />
        </Stack>
      </Box>
      {children}
      <Sheet component="footer" sx={{ py: 3 }}>
        <Typography level="body-xs" textAlign="center">
          © Grupo 3 (2023, 2° cuat. martes mañana)
        </Typography>
      </Sheet>
    </>
  );
}
