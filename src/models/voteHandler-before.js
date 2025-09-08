/* voteHandler-before.js (original) */
export const castVoteOriginal = (poll, option) => {
  if (!(option in poll.options)) {
    throw new Error("Invalid option");
  }
  poll.options[option] += 1;
  return poll;
};
