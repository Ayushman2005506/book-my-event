
import React from 'react';
import { Event } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div onClick={() => navigate(`/event/${event.id}`)}>
        {event.imageUrl && (
          <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {event.name}
            </h3>
            <Badge variant={event.ticketPrice === 0 ? "secondary" : "default"}>
              {formatPrice(event.ticketPrice)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.date)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {event.time}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.venue}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {event.availableSeats} / {event.totalSeats} seats available
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3">
        <Button 
          className="w-full" 
          onClick={() => navigate(`/event/${event.id}`)}
          disabled={event.availableSeats === 0}
        >
          {event.availableSeats === 0 ? 'Sold Out' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
};
