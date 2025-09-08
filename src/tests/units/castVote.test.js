import { castVote, createPoll, getPollById } from '../../models/pollModel.js';

describe("castVote (Unit Test)", () => {
  let poll;

  beforeEach(() => {
    // Create a new poll before each test
    poll = createPoll("Test Poll", ["yes", "no"]);
  });

  it("should increment vote count for a valid option", () => {
    const updatedPoll = castVote(poll, "yes");
    expect(updatedPoll.options.yes).toBe(1);
  });

  it("should throw error for invalid option", () => {
    expect(() => castVote(poll, "maybe")).toThrow("Invalid option");
  });
});