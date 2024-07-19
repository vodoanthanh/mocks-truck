import { HttpMethod } from "@/constants";
import { Configuration, MockAPIResponse, Session } from "@/types";

export const SessionService = new (class {
  private sessionsById: Map<string, Session> = new Map();

  upsertConfigurationToSession(
    id: string,
    configuration: Configuration
  ): boolean {
    this.sessionsById.set(id, { configuration, usage: {} });
    return true;
  }

  findById(id: string): Session {
    const session = this.sessionsById.has(id) && this.sessionsById.get(id);
    if (session) {
      return session;
    }
    throw new Error("Session is not found.");
  }

  deleteById(id: string): boolean {
    this.findById(id);
    return this.sessionsById.delete(id);
  }

  resetUsageById(id: string): boolean {
    const session = this.findById(id);
    session.usage = {};
    this.sessionsById.set(id, session);
    return true;
  }

  getAPIMockResponse(
    id: string,
    endpoint: string,
    method: HttpMethod
  ): MockAPIResponse {
    const session = this.findById(id);

    console.log(id, endpoint, method);

    const mocks = session.configuration.mocks.filter(
      (mock) =>
        new RegExp(mock.endpointRegex).test(endpoint) && mock.method === method
    );
    if (!mocks.length) throw new Error("API mock is not found.");

    const usageKey = `${mocks[0].endpointRegex}_${mocks[0].method}`;
    const currentCount = session.usage[usageKey] || 0;

    session.usage[usageKey] = currentCount + 1;
    this.sessionsById.set(id, session);

    return mocks[Math.min(currentCount, mocks.length - 1)].response;
  }
})();
