import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@/env/environment";
import { User } from "@/app/models/user";
import { Idea, IdeaDTO } from "@/app/models/idea";
import { Comment } from "@/app/models/comment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private api: string = environment.api_server + "/api";

  constructor(private http: HttpClient, private auth: AuthService) {}

  private request(
    method: string,
    endpoint: string,
    body?: any
  ): Observable<any> {
    const url = `${this.api}/${endpoint}`;
    return this.http.request(method, url, {
      body,
      headers: {
        authorization: `Bearer ${this.auth.token}`
      }
    });
  }

  getUsers(current?: string): Observable<User[]> {
    const endpoint = current ? `user?current=${current}` : "user";
    return this.request("GET", endpoint);
  }

  getUser(username: string): Observable<User> {
    return this.request("GET", `user/${username}`);
  }

  getIdeas(current?: string): Observable<Idea[]> {
    const endpoint = current ? `idea?current=${current}` : "idea";
    return this.request("GET", endpoint);
  }

  getNewestIdeas(current?: string): Observable<Idea[]> {
    const endpoint = current ? `idea/newest?current=${current}` : "idea/newest";
    return this.request("GET", endpoint);
  }

  getIdea(id: string): Observable<Idea> {
    return this.request("GET", `idea/${id}`);
  }

  createIdea(data: IdeaDTO): Observable<Idea> {
    return this.request("POST", `idea`, data);
  }

  updateIdea(id: string, data: IdeaDTO): Observable<Idea> {
    return this.request("PUT", `idea/${id}`, data);
  }

  deleteIdea(id: string): Observable<Idea> {
    return this.request("DELETE", `idea/${id}`);
  }

  upvoteIdea(id: string): Observable<Idea> {
    return this.request("POST", `idea/${id}/upvote`);
  }

  downvoteIdea(id: string): Observable<Idea> {
    return this.request("POST", `idea/${id}/downvote`);
  }

  bookmarkIdea(id: string): Observable<User> {
    return this.request("POST", `idea/${id}/bookmark`);
  }

  unbookmarkIdea(id: string): Observable<User> {
    return this.request("DELETE", `idea/${id}/bookmark`);
  }

  getCommentsByIdea(ideaId: string, current?: string): Observable<Comment[]> {
    const endpoint = current
      ? `comment/idea/${ideaId}?current=${current}`
      : `comment/idea/${ideaId}`;
    return this.request("GET", endpoint);
  }

  getCommentsByUser(userId: string, current?: string): Observable<Comment[]> {
    const endpoint = current
      ? `comment/user/${userId}?current=${current}`
      : `comment/user/${userId}`;
    return this.request("GET", endpoint);
  }

  getComment(id: string): Observable<Comment> {
    return this.request("GET", `comment/${id}`);
  }

  createComment(ideaId: string, data): Observable<Comment> {
    return this.request("POST", `comment/idea/${ideaId}`, data);
  }

  deleteComment(id: string): Observable<Comment> {
    return this.request("DELETE", `comment/${id}`);
  }
}
