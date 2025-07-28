import mongoose from 'mongoose';

const weeklyChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const WeeklyChallenge = mongoose.model('WeeklyChallenge', weeklyChallengeSchema);

export default WeeklyChallenge;