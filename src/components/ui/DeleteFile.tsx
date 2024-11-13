import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';
import { FileMetadata } from '@/interfaces/File-interface';
import { useAppDispatch } from '@/redux/Store';
import { deleteFileById } from '@/redux/FilesSlice';
import { Trans, useTranslation } from 'react-i18next';

const DeleteFile = ({ file }: { file: FileMetadata }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteFileById(file.id));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-0">
        <Trash className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            <Trans i18nKey="deleteDescription" values={{ name: file.filename }}></Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md "
          >
            {t('delete')}
          </AlertDialogAction>
          <AlertDialogCancel className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-md ">
            {t('cancel')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFile;
