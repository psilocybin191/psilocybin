import * as mongoose from 'mongoose';
export const BusinessSchema = new mongoose.Schema({

  id: String,
  image: { type: String, default: 'https://image.flaticon.com/icons/svg/64/64096.svg' },
  list_email: [],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
  created_at: { type: Date, default: Date.now }

});
