import DeleteFile from '@/components/ui/DeleteFile';
import { FileMetadata } from '@/interfaces/File-interface';

const ShowFiles = ({ file }: { file: FileMetadata }) => {
  return (
    <li className="flex group justify-between group text-xl cursor-pointer h-11 items-center mx-3 rounded-lg px-3 pb-0. py-1 text-muted-foreground transition-all hover:bg-muted">
      <p className="text-sm font-medium leading-none">{file.filename.charAt(0).toUpperCase() + file.filename.slice(1, 27)}</p>
      <div className="hidden group-hover:block">
        <DeleteFile file={file} />
      </div>
    </li>
  );
};

export default ShowFiles;
