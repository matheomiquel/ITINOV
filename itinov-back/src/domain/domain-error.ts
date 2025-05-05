import { Error } from "@src/error";

export class DomainError {
  static wrongPassword(): Error {
    return new Error({
      message: "User not found",
      status: 404
    });
  }

  static movieNotFound(): Error {
    return new Error({
      message: "Movie not found",
      status: 404
    });
  }
}
