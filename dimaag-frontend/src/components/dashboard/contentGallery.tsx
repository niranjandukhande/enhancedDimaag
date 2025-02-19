import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { ContentCard } from "./contentCard";

export const MinimalistContentGallery = (contentDataArray:any) => {
    const [showPrivate, setShowPrivate] = useState(true);
    console.log("contentDataArray", contentDataArray);
    return (
      <div className="w-full mx-auto p-4 md:p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Library</h1>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="show-private" 
              checked={showPrivate} 
              onCheckedChange={setShowPrivate} 
            />
            <Label htmlFor="show-private" className="text-sm">
              {showPrivate ? "Showing all content" : "Hiding private content"}
            </Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {contentDataArray.map((item:any) => (
            <ContentCard 
              key={item.id} 
              data={item} 
              showPrivate={showPrivate}
            />
          ))}
        </div>
      </div>
    );
  };