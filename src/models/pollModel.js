// src/models/pollModel.js
// In-memory "database"
let polls = [
  { id: 1, question: "Do you like AI?", options: { yes: 0, no: 0 } }
];

const clone = (obj) => JSON.parse(JSON.stringify(obj)); // safe deep clone for simple types

export const getPollById = (id) => polls.find(p => p.id === id);

export const createPoll = (question, options) => {
  // Normalize options -> always an object { optionName: 0 }
  let formattedOptions;
  if (Array.isArray(options)) {
    formattedOptions = {};
    for (const opt of options) {
      // sanitize option name: only letters, numbers, spaces, hyphen, underscore
      const name = String(opt).trim();
      if (!/^[\w\s\-]{1,60}$/.test(name)) continue; // skip invalid names
      formattedOptions[name] = 0;
    }
  } else if (typeof options === "object" && options !== null) {
    formattedOptions = {};
    for (const k of Object.keys(options)) {
      if (!Object.prototype.hasOwnProperty.call(options, k)) continue;
      const name = String(k).trim();
      if (!/^[\w\s\-]{1,60}$/.test(name)) continue;
      formattedOptions[name] = Number(options[k]) || 0;
    }
  } else {
    throw new Error("Options must be an array or object of options");
  }

  if (Object.keys(formattedOptions).length < 2) {
    throw new Error("At least two valid options required");
  }

  // create new poll with a less predictable id (timestamp + random)
  const newId = Date.now() + Math.floor(Math.random() * 1000);
  const newPoll = { id: newId, question: String(question).trim(), options: formattedOptions };
  polls.push(newPoll);
  return clone(newPoll); // return safe clone
};

export const castVote = (poll, option) => {
  if (!poll || typeof poll !== "object") {
    throw new Error("Invalid poll");
  }
  if (!Object.prototype.hasOwnProperty.call(poll.options, option)) {
    throw new Error("Invalid option");
  }
  // update internal store (find actual reference)
  const stored = getPollById(poll.id);
  if (!stored) throw new Error("Poll not found");
  stored.options[option] = (Number(stored.options[option]) || 0) + 1;
  return clone(stored);
};

export const getAllPolls = () => clone(polls);
