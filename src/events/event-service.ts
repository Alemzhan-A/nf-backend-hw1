import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { SortOrder } from 'mongoose';




class EventService {
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(city: string | undefined, page: number = 1, limit: number = 10, sortBy: string = 'date', sortDirection: string = 'asc'): Promise<{ events: IEvent[], total: number }> {
      const query = city ? { location: city } : {};
      const skip = (page - 1) * limit;
      
      // Указание типа сортировки
      const sort: Record<string, SortOrder> = { [sortBy]: sortDirection === 'desc' ? -1 : 1 };

      const events = await EventModel.find(query)
          .sort(sort)
          .limit(limit)
          .skip(skip)
          .exec();

      const total = await EventModel.countDocuments(query);

      return { events, total };
  }
    

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location ,duration} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        location,
        duration
      });
  
      await newEvent.save();
      return newEvent;
    }
  
    
  }
  
  export default EventService;
  