
import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceRequest extends Document {
  name: string;
  email: string;
  serviceType: string;
  message: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

const ServiceRequestSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true 
  }
);
const ServiceRequest = mongoose.models.ServiceRequest || 
  mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);

export default ServiceRequest;