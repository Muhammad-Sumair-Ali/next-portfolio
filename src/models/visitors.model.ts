
import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  city: String,
  country: String,
  region: String,
  timezone: String,
  isp: String,
  source: String, 
  timestamp: Date
});

const visitorsModel = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);
export default visitorsModel;