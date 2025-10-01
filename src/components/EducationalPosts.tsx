import React, { useState } from 'react';
import { educationalPosts, EducationalPost } from '@/data/educationalPosts';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMaterialIcon } from '@/utils/materialIcons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const EducationalPosts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<EducationalPost | null>(null);

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
            placeholder="Buscar temas de reciclaje..."
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
                onClick={() => setSelectedPost(post)}
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
              No se encontraron publicaciones que coincidan con "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = getMaterialIcon(selectedPost.category);
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                    <Badge variant="secondary">{selectedPost.category}</Badge>
                  </div>
                  <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground text-lg">{selectedPost.description}</p>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground whitespace-pre-wrap">{selectedPost.content}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
