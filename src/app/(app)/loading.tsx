export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] items-center justify-center bg-bg-primary px-6"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-[#D1AFEC] border-t-btn-primary dark:border-[#664282] dark:border-t-btn-primary" />
        <div className="h-9 w-9 rounded-full bg-btn-primary/15" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
