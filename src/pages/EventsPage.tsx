
import React, { useState, useMemo } from 'react';
import { EventCard } from '@/components/EventCard';
import { EventFilters } from '@/components/EventFilters';
import { Event } from '@/types';

// Mock data - replace with actual API calls
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Innovation Summit 2024',
    description: 'Join us for a day of cutting-edge technology discussions, startup pitches, and networking opportunities.',
    venue: 'Main Auditorium',
    date: '2024-02-15',
    time: '09:00 AM',
    totalSeats: 200,
    availableSeats: 150,
    ticketPrice: 25,
    tags: ['Technical', 'Conference'],
    clubId: '1',
    clubName: 'Computer Science Club',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Cultural Night: Around the World',
    description: 'Experience diverse cultures through music, dance, and cuisine from around the globe.',
    venue: 'Student Center',
    date: '2024-02-20',
    time: '07:00 PM',
    totalSeats: 300,
    availableSeats: 275,
    ticketPrice: 0,
    tags: ['Cultural', 'Social'],
    clubId: '2',
    clubName: 'International Students Association',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=300&fit=crop',
    createdAt: '2024-01-20T14:00:00Z',
  },
  {
    id: '3',
    name: 'Basketball Championship Finals',
    description: 'The ultimate showdown between our top teams. Don\'t miss the excitement!',
    venue: 'Sports Complex',
    date: '2024-02-25',
    time: '03:00 PM',
    totalSeats: 500,
    availableSeats: 425,
    ticketPrice: 10,
    tags: ['Sports'],
    clubId: '3',
    clubName: 'Athletics Department',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop',
    createdAt: '2024-01-25T16:00:00Z',
  },
  {
    id: '4',
    name: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop covering the latest in AI and ML technologies. Bring your laptops!',
    venue: 'Computer Lab A',
    date: '2024-03-01',
    time: '10:00 AM',
    totalSeats: 50,
    availableSeats: 12,
    ticketPrice: 15,
    tags: ['Technical', 'Workshop'],
    clubId: '1',
    clubName: 'Computer Science Club',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
    createdAt: '2024-02-01T09:00:00Z',
  },
];

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('date');

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortBy('date');
  };

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = mockEvents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(event =>
        event.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.ticketPrice - b.ticketPrice;
        case 'popularity':
          return (b.totalSeats - b.availableSeats) - (a.totalSeats - a.availableSeats);
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedTags, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
          <p className="text-gray-600">Discover and book tickets for exciting events happening at your university</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EventFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredAndSortedEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
