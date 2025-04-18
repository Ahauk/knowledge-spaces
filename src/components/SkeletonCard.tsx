export const SpinnerLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/80 z-50'>
      <div className='w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin' />
    </div>
  );
};
