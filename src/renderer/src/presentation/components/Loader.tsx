import CircularProgress from '@mui/material/CircularProgress';

export const Loader = ({ isLoading = false }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className='w-full flex justify-center items-center'>
      <CircularProgress />
    </div>
  );
};
