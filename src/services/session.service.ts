import { HttpMethod, HttpStatusCode, MESSAGES } from "@/constants";
import { AppException } from "@/exceptions";
import { FormatterHelper } from "@/helpers";
import { Configuration, MockAPIResponse, Session } from "@/types";
import { ConfigurationService } from "./configuration.service";

export const SessionService = new (class {
  private sessionsById: Map<string, Session> = new Map();

  upsertConfigurationToSession(
    id: string,
    configuration: Configuration
  ): Session {
    const session = { configuration, usage: {} };
    this.sessionsById.set(id, session);
    return session;
  }

  findByIdOrThrowError(id: string): Session {
    const session = this.sessionsById.has(id) && this.sessionsById.get(id);
    if (session) {
      return session;
    }

    throw new AppException({
      message: MESSAGES.NOT_FOUND.SESSION,
      status: HttpStatusCode.NotFound,
    });
  }

  deleteById(id: string): boolean {
    this.findByIdOrThrowError(id);
    return this.sessionsById.delete(id);
  }

  async refreshById(id: string): Promise<boolean> {
    const session = this.findByIdOrThrowError(id);
    if (session.configuration.id) {
      session.configuration = await ConfigurationService.findByIdOrThrowError(
        session.configuration.id
      );
    }
    session.usage = {};
    this.sessionsById.set(id, session);
    return true;
  }

  getAPIMockResponse(
    id: string,
    endpoint: string,
    method: HttpMethod
  ): MockAPIResponse {
    const session = this.findByIdOrThrowError(id);
    const mocks = FormatterHelper.formatStringToObject(
      session.configuration.mocks
    ).filter(
      (mock) =>
        new RegExp(mock.endpointRegex).test(endpoint) && mock.method === method
    );
    if (!mocks.length)
      throw new AppException({
        message: MESSAGES.NOT_FOUND.API_MOCK,
        status: HttpStatusCode.NotFound,
      });

    const usageKey = `${mocks[0].endpointRegex}_${mocks[0].method}`;
    const currentCount = session.usage[usageKey] || 0;

    session.usage[usageKey] = currentCount + 1;
    this.sessionsById.set(id, session);

    return mocks[Math.min(currentCount, mocks.length - 1)].response;
  }
})();
