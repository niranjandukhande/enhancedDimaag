import { useInfiniteContent } from '@/hooks/useInfinite';
import ContentInfinite from './utils/contentInfinite';
import ContentDisplay from './utils/contentDisplay';
import { useContent } from '@/hooks/useContent';

function Dashboard() {
  const {
    content,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteContent();

  // const content = useContent();

  return (
    <div className="bg-[#2F3C7E]">
      {/* <LinkModel /> */}
      {content && (
        <ContentInfinite
          content={content}
          error={error}
          status={status}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )}
      {/* {content && <ContentDisplay content={content} />} */}
    </div>
  );
}

export default Dashboard;
