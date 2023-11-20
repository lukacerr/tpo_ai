import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';

export const FilesReception = ({ field = 'files', maxCount = 1 } = {}) =>
  UseInterceptors(
    FilesInterceptor(field, maxCount, {
      storage: diskStorage({
        destination: './public',
        filename: (_, file, cb) =>
          cb(
            null,
            `${randomBytes(8).toString('hex')}${extname(file.originalname)}`,
          ),
      }),
    }),
  );
