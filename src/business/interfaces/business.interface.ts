import { Document } from 'mongoose';
export interface Business extends Document {
  image: string,
  list_email: [],
  user_id: { objId: string },
  permission_id:  string 
}
