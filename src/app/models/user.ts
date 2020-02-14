import { Idea } from "./idea";
import { Comment } from "./comment";

export interface User {
  id: string;
  username: string;
  created: Date;
  bookmarks: Idea[];
  comments: Comment[];
}
