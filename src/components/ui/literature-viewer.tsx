import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Lock, FileText, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  type: 'pdf' | 'word';
  fileUrl?: string;
  previewPages?: number; // Количество бесплатных страниц
  totalPages?: number;
  subscription_required: 'basic' | 'advanced' | 'premium';
}

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Основы генетического питания',
    author: 'Никита Морачковский',
    description: 'Полное руководство по персонализированному питанию на основе генетических данных',
    coverImage: '/lovable-uploads/3ff2d995-dd9d-496f-9fe9-49348a616e31.png',
    type: 'pdf',
    previewPages: 3,
    totalPages: 120,
    subscription_required: 'basic'
  },
  {
    id: '2',
    title: 'Метаболизм и здоровье',
    author: 'Никита Морачковский',
    description: 'Глубокое понимание метаболических процессов для оптимизации здоровья',
    coverImage: '/lovable-uploads/4e6e84c7-600e-46c2-8395-3610512dbe41.png',
    type: 'pdf',
    previewPages: 5,
    totalPages: 200,
    subscription_required: 'advanced'
  },
  {
    id: '3',
    title: 'Продвинутая нутригенетика',
    author: 'Никита Морачковский',
    description: 'Профессиональное руководство по применению генетических данных в практике',
    coverImage: '/lovable-uploads/6462592d-c9dd-4788-9e48-3497f1bccfdf.png',
    type: 'word',
    previewPages: 2,
    totalPages: 180,
    subscription_required: 'premium'
  }
];

export function LiteratureViewer() {
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  const canAccessBook = (book: Book) => {
    if (!user) return false;
    const userTier = user.subscription_tier;
    const requiredTier = book.subscription_required;
    
    const tierLevels = { basic: 1, advanced: 2, premium: 3 };
    return tierLevels[userTier] >= tierLevels[requiredTier];
  };

  const canViewPage = (book: Book, pageNum: number) => {
    if (!book.previewPages) return canAccessBook(book);
    return pageNum <= book.previewPages || canAccessBook(book);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum: number) => {
    if (selectedBook && canViewPage(selectedBook, pageNum)) {
      setCurrentPage(pageNum);
    } else {
      toast.error("Для просмотра этой страницы необходима подписка");
    }
  };

  const getSubscriptionBadgeColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      case 'premium': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Литература</h2>
        {selectedBook && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedBook(null)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Назад к списку
          </Button>
        )}
      </div>

      {!selectedBook ? (
        // Books Grid
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleBooks.map((book) => (
            <Card key={book.id} className="bg-dark-surface overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${getSubscriptionBadgeColor(book.subscription_required)} text-white border-0`}>
                    {book.subscription_required}
                  </Badge>
                </div>
                {book.type === 'word' && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">
                      <FileText className="w-3 h-3 mr-1" />
                      Word
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Предпросмотр: {book.previewPages} стр.</span>
                  <span>Всего: {book.totalPages} стр.</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleBookSelect(book)}
                    disabled={!canAccessBook(book) && !book.previewPages}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {canAccessBook(book) ? 'Читать' : 'Предпросмотр'}
                  </Button>
                  {canAccessBook(book) && (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // PDF Viewer
        <div className="space-y-4">
          <Card className="bg-dark-surface p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedBook.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getSubscriptionBadgeColor(selectedBook.subscription_required)} text-white border-0`}>
                  {selectedBook.subscription_required}
                </Badge>
                {!canAccessBook(selectedBook) && (
                  <Badge variant="destructive">
                    <Lock className="w-3 h-3 mr-1" />
                    Ограниченный доступ
                  </Badge>
                )}
              </div>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Страница {currentPage} из {numPages || selectedBook.totalPages}
                </span>
                {selectedBook.previewPages && !canAccessBook(selectedBook) && (
                  <span className="text-xs text-amber-500">
                    (доступно {selectedBook.previewPages} стр.)
                  </span>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= (numPages || selectedBook.totalPages || 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* PDF Display */}
            <div className="border border-border rounded-lg overflow-hidden bg-white">
              {selectedBook.type === 'pdf' ? (
                <ScrollArea className="h-[600px]">
                  <div className="flex justify-center p-4">
                    {canViewPage(selectedBook, currentPage) ? (
                      <Document
                        file={selectedBook.fileUrl || "/sample.pdf"} // Демо PDF
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                          <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                          </div>
                        }
                        error={
                          <div className="flex flex-col items-center justify-center h-96 space-y-4">
                            <FileText className="w-16 h-16 text-muted-foreground" />
                            <p className="text-center text-muted-foreground">
                              PDF файл недоступен.<br />
                              Это демо-версия просмотрщика.
                            </p>
                          </div>
                        }
                      >
                        <Page 
                          pageNumber={currentPage}
                          width={Math.min(800, window.innerWidth - 100)}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-96 space-y-4 bg-gray-100 rounded">
                        <Lock className="w-16 h-16 text-muted-foreground" />
                        <div className="text-center">
                          <p className="font-medium text-gray-900">Страница заблокирована</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Для доступа к полному содержанию необходима подписка {selectedBook.subscription_required}
                          </p>
                        </div>
                        <Button>
                          Оформить подписку
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              ) : (
                // Word Document Preview (placeholder)
                <div className="flex flex-col items-center justify-center h-96 space-y-4">
                  <FileText className="w-16 h-16 text-primary" />
                  <div className="text-center">
                    <p className="font-medium text-foreground">Word документ</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedBook.title}
                    </p>
                  </div>
                  {canAccessBook(selectedBook) ? (
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Скачать документ
                    </Button>
                  ) : (
                    <div className="text-center space-y-2">
                      <p className="text-sm text-amber-600">
                        Для скачивания необходима подписка {selectedBook.subscription_required}
                      </p>
                      <Button>
                        Оформить подписку
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}