import LinkModel from '@/components/dashboard/utils/LinkModel';
import ContentDisplay from '@/components/dashboard/utils/contentDisplay';
import { useContent } from '@/hooks/useContent';

function Dashboard() {
  const content = useContent();

  return (
    <>
      <LinkModel />
      {content && <ContentDisplay content={content} />}
    </>
  );
}

export default Dashboard;
