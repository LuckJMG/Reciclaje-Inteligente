import React, { useState } from 'react';
import { educationalPosts } from '@/data/educationalPosts';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMaterialIcon } from '@/utils/materialIcons';

export const EducationalPosts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = educationalPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-gradient-hero pb-4 sm:pb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search recycling topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-card shadow-soft"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const Icon = getMaterialIcon(post.category);
            return (
              <Card
                key={post.id}
                className="hover:shadow-elevated transition-all duration-300 cursor-pointer group"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
