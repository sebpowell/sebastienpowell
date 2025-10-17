const STORAGE = "test";

type Database = {
  authors: Author[];
  resources: Resource[];
  comments: Comment[];
};

type Author = {
  id: string;
  avatar_url?: string;
  name?: string;
  email?: string;
};

type Resource = {
  id: string;
  external_identifier: string;
};

export type Comment = {
  id: string;
  author: Author;
  resource_id: Resource;
  created_at: string;
  comment: string;
  parent_id: string | null;
  level: number;
  children: Comment[];
};

enum SortOrder {
  "oldest" = "oldest",
  "newest" = "newest",
}

type CreateCommentRequest = {
  test: string;
};

type UpdateCommentRequest = {
  comment: string;
};

type GetManyRequest = {
  limit: number;
  offset: number;
};

type AuthenticateRequest = {
  email: string;
  redirectTo: string;
};

class CommentsService {
  getData = () => {
    const data: Database = { resources: [], authors: [], comments: [] };

    return data;
  };

  authenticate(props: AuthenticateRequest) {}

  create(props: CreateCommentRequest) {
    const data = this.getData();

    return {};
  }

  update(commentId: string, body: UpdateCommentRequest) {}

  delete() {
    const data = this.getData();

    // const updated: Model = {
    //   ...data,
    //   // "comments": data.comments.filter((item) => item.)
    // };

    // localStorage.setItem(STORAGE, {
    //     ...data,

    // })
  }

  getById() {}

  getMany(props: GetManyRequest) {
    return [];
  }
}

const commentsService = new CommentsService();

export { commentsService };
