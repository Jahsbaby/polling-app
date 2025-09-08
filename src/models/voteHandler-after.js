/* voteHandler-after.js (refactored) */
export const castVoteRefactored = (poll, option) => {
  // make the check explicit and safe
  if (!poll || !poll.options || !Object.prototype.hasOwnProperty.call(poll.options, option)) {
    throw new Error("Invalid option");
  }

  // ensure an integer count (defensive)
  const current = Number(poll.options[option] ?? 0);
  poll.options[option] = current + 1;

  // return a shallow copy to avoid accidental external mutation
  return { ...poll, options: { ...poll.options } };
};
