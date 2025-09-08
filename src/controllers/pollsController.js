// src/controllers/pollsController.js
import { createPoll, castVote, getAllPolls, getPollById } from '../models/pollModel.js';

export const getPollsController = (req, res) => {
  const polls = getAllPolls();
  res.json(polls);
};

export const createPollController = (req, res) => {
  const { question, options } = req.body;
  try {
    const newPoll = createPoll(question, options);
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const castVoteController = (req, res) => {
  const pollId = parseInt(req.params.id, 10);
  const { option } = req.body;
  const poll = getPollById(pollId);

  if (!poll) {
    return res.status(404).json({ error: 'Poll not found' });
  }

  try {
    const updatedPoll = castVote(poll, option);
    res.json(updatedPoll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
