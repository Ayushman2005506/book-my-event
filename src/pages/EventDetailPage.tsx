
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock event data - replace with actual API call
const mockEvent = {
  id: '1',
  name: 'Tech Innovation Summit 2024',
  description: 'Join us for a day of cutting-edge technology discussions, startup pitches, and networking opportunities. This comprehensive event will feature keynote speakers from leading tech companies, interactive workshops, and plenty of networking opportunities. Whether you\'re a student looking to learn about the latest in technology or an aspiring entrepreneur with the next big idea, this summit is designed for you.',
  venue: 'Main Auditorium, Engineering Building',
  date: '2024-02-15',
  time: '09:00 AM - 06:00 PM',
  totalSeats: 200,
  availableSeats: 150,
  ticketPrice: 25,
  tags: ['Technical', 'Conference', 'Networking'],
  clubId: '1',
  clubName: 'Computer Science Club',
  imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  createdAt: '2024-01-15T10:00:00Z',
};

export const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  // In a real app, fetch event data based on ID
  const event = mockEvent;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (user.role !== 'student') {
      toast({
        title: "Access Denied",
        description: "Only students can book tickets.",
        variant: "destructive",
      });
      return;
    }

    if (bookingQuantity > event.availableSeats) {
      toast({
        title: "Insufficient Seats",
        description: `Only ${event.availableSeats} seats available.`,
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    
    // Mock API call - replace with actual booking API
    setTimeout(() => {
      toast({
        title: "Booking Successful!",
        description: `Successfully booked ${bookingQuantity} ticket${bookingQuantity > 1 ? 's' : ''} for ${event.name}.`,
      });
      setIsBooking(false);
      // Navigate to bookings page
      navigate('/my-bookings');
    }, 2000);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            {event.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}

            {/* Event Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{event.name}</CardTitle>
                    <p className="text-sm text-gray-600">Organized by {event.clubName}</p>
                  </div>
                  <Badge variant={event.ticketPrice === 0 ? "secondary" : "default"} className="text-lg px-3 py-1">
                    {formatPrice(event.ticketPrice)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">{event.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">{event.availableSeats} / {event.totalSeats} available</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-lg mb-2">About This Event</h3>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.availableSeats === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-red-600 font-medium">This event is sold out</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="quantity">Number of Tickets</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={Math.min(event.availableSeats, 10)}
                        value={bookingQuantity}
                        onChange={(e) => setBookingQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Maximum 10 tickets per booking
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total Cost:</span>
                        <span className="text-xl font-bold">
                          {formatPrice(event.ticketPrice * bookingQuantity)}
                        </span>
                      </div>

                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleBooking}
                        disabled={isBooking || !user || user.role !== 'student'}
                      >
                        {isBooking ? 'Booking...' : 'Book Now'}
                      </Button>

                      {!user && (
                        <p className="text-sm text-gray-500 text-center mt-2">
                          Please <button 
                            className="text-blue-600 hover:underline"
                            onClick={() => navigate('/login')}
                          >
                            log in
                          </button> to book tickets
                        </p>
                      )}

                      {user && user.role !== 'student' && (
                        <p className="text-sm text-red-500 text-center mt-2">
                          Only students can book tickets
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Tickets are non-refundable</p>
                      <p>• Please arrive 15 minutes early</p>
                      <p>• Bring a valid student ID</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
