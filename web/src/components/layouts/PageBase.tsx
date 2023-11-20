import { hasAuthToken } from '@/utils/auth';
import { Box, BoxProps, Sheet } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { Helmet, HelmetProps } from 'react-helmet';
import Sidebar from './Sidebar';

export interface IPageBase {
  title: string;
  description?: string;
  helmetOptions?: HelmetProps;
  mainSx?: SxProps;
  mainProps?: BoxProps;
}

export default function PageBase({
  children,
  title,
  description,
  helmetOptions,
  mainSx,
  mainProps,
}: React.PropsWithChildren<IPageBase>) {
  return (
    <>
      <Helmet {...helmetOptions}>
        <title>{title} | TPO AI - Grupo 3</title>
        <meta
          name="description"
          content={`${description && `${description} | `}TPO de Aplicaciones interactivas, Grupo 3 (martes & mañana)`}
        />
      </Helmet>

      <Box component="main" {...mainProps} sx={{ display: 'flex', ...mainSx }}>
        {hasAuthToken() && <Sidebar></Sidebar>}
        <Sheet variant="soft" sx={{ overflow: 'auto', padding: 4, margin: 2, borderRadius: 10, width: '100%' }}>
          {children}
        </Sheet>
      </Box>
    </>
  );
}
