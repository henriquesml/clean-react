import { HttpPostClient } from 'data/protocols/http/HttpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post (url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}
