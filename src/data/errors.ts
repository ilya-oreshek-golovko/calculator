class PrioritiesError extends Error {
    constructor(message : string) {
      super(message);
      this.name = "PrioritiesError";
    }
}
class ParserError extends Error {
  constructor(message : string) {
    super(message);
    this.name = "ParserError";
  }
}

export {PrioritiesError, ParserError};