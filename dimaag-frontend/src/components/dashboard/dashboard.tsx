import { Button } from '@/components/ui/button';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

import { useContent } from '@/hooks/useContent';
import LinkModel from '@/components/dashboard/LinkModel';
import ContentDisplay from './contentDisplay';
import { Input } from '../ui/input';

function Dashboard() {
  const { user } = useUser();
  const [content, setContent] = useState([]);
  const { data } = useContent();
  useEffect(() => {
    if (data) {
      console.log('data', data);
      setContent(data);
    }
  }, [data]);
  console.log('content', content.data);
const [search,setSearch]=useState("")
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        {user?.emailAddresses[0].emailAddress && (
          <p>Email: {user.emailAddresses[0].emailAddress}</p>
        )}
      </div>
      <div className="flex space-x-4 mb-4">
        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>

        <LinkModel />
<div>
  <Input 
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  placeholder="Search for content"
  />
  <Button onClick={()=>console.log(search)}>Search</Button>
</div>
        {content.data && <ContentDisplay contentData={content.data} />}
      </div>
    </div>
  );
}

export default Dashboard;
