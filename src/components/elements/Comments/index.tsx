import { LoginForm } from "@/components/elements/AuthModal";
import { Avatar } from "@/components/elements/Avatar";
import { Box, BoxProps } from "@/components/elements/Box";
import { Button } from "@/components/elements/Button";
import { commentsService, type Comment as IComment } from "@/lib/comments";
import { cn } from "@/utils/cn.util";
import { createContext } from "@/utils/createContext.util";
import { ReactNode, useEffect, useState } from "react";
import { useToggle } from "react-use";

type CommentContextProps = {
  comment: IComment;
  reply: string;
  isReplyOpen: boolean;
  isDeleting: boolean;
  isEditing: boolean;
  canEdit: boolean;
  canDelete: boolean;
  handleSetReply(value: string): void;
  handleToggleEdit(): void;
  handleToggleDelete(): void;
  handleToggleReply(): void;
  handleSubmitReply(): void;
};

const [CommentContext, useCommentContext] =
  createContext<CommentContextProps>();

type CommentContentProviderProps = Pick<CommentContextProps, "comment"> & {
  children: ReactNode;
};
const CommentContextProvider = (props: CommentContentProviderProps) => {
  const { children, comment } = props;

  const { id } = comment;

  const [reply, handleSetReply] = useState<string>("");

  const [isReplyOpen, handleToggleReply] = useToggle(false);

  const [isDeleting, handleToggleDelete] = useToggle(false);

  const [isEditing, handleToggleEdit] = useToggle(false);

  const getDraftReply = localStorage.getItem(`draft_`);

  // useEffect(() => {}, [value]);

  // const handleDelete = async () => {
  //   await commentsService.delete(id);
  // };

  const handleSubmitReply = async () => {
    await commentsService.create({ test: "" });
  };

  const ctx: CommentContextProps = {
    isReplyOpen,
    isDeleting,
    isEditing,
    canDelete: true,
    canEdit: true,
    comment,
    reply,
    handleToggleEdit,
    handleToggleDelete,
    handleSetReply,
    handleSubmitReply,
    handleToggleReply,
  };

  return <CommentContext value={ctx}>{children}</CommentContext>;
};

const CommentHeader = () => {
  const {
    comment: {
      author: { name, email },
      created_at,
    },
  } = useCommentContext();

  const displayName = name || email || "Anonymous";

  return (
    <div className="flex h-8 items-center gap-x-1">
      <div className="leading-none text-text-strong">{displayName}</div>
      <div className="leading-none">{created_at}</div>
    </div>
  );
};

const CommentBody = () => {
  const {
    comment: { comment },
    isEditing,
  } = useCommentContext();

  return <>Test</>;
};

const Comment = (props: Pick<CommentContextProps, "comment">) => {
  const { comment } = props;

  const { children } = comment;

  return (
    <CommentContextProvider comment={comment}>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <Avatar />
          <CommentThreadLine />
        </div>
        <div className="flex-1 space-y-5">
          <div>
            <CommentHeader />
            <div className="space-y-4">
              <CommentBody />
              <CommentFooter />
            </div>
          </div>
          {children.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
    </CommentContextProvider>
  );
};

const CommentEditor = (props: BoxProps<"textarea">) => {
  const { className, ...rest } = props;

  return (
    <textarea
      className={cn("min-h-10 flex-1 rounded-xl p-4 outline-none", className)}
      placeholder="Comment..."
      {...rest}
    />
  );
};

const CommentThreadLine = () => {
  return <div className="w-px flex-1 bg-neutral-500" />;
};

const CommentReply = (props: BoxProps) => {
  const { handleToggleReply, handleSetReply, handleSubmitReply, reply } =
    useCommentContext();

  const { className, ...rest } = props;

  return (
    <Box className={cn("flex-1 gap-x-3", className)} {...rest}>
      <div className="flex gap-x-3">
        <Avatar />
        <div>
          <CommentEditor
            value={reply}
            onChange={(e) => handleSetReply(e.target.value)}
          />
          <div>Error message</div>
        </div>
      </div>
      <div className="flex items-center justify-between space-y-4">
        <div>Comment anonymously</div>
        <div className="flex gap-3">
          <Button
            className="bg-transparent text-white"
            onClick={handleToggleReply}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmitReply}>Reply</Button>
        </div>
      </div>
    </Box>
  );
};

const CommentFooter = () => {
  const { handleToggleReply, handleToggleDelete } = useCommentContext();

  return (
    <div className="space-y-3">
      <button className="underline" onClick={handleToggleReply}>
        Reply
      </button>
      <button className="underline" onClick={handleToggleDelete}>
        Delete
      </button>
      <CommentReply />
    </div>
  );
};

const ThreadBody = () => {
  const { comments } = useThreadContext();

  return (
    <>
      {comments.map((comment, i) => {
        return <Comment key={i} comment={comment} />;
      })}
    </>
  );
};

const ThreadHeader = () => {
  const { comments } = useThreadContext();

  return (
    <div className="flex items-center justify-between">
      <h2>Comments ({comments.length})</h2>
      <div className="flex h-10 flex-col items-center justify-center rounded-full border px-4">
        Top frist
      </div>
    </div>
  );
};

type ThreadContextProps = {
  comments: IComment[];
  handleCreateComment(): void;
  handleDeleteComment(): void;
};

const [ThreadContext, useThreadContext] = createContext<ThreadContextProps>();

const ThreadContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [comments] = useState<IComment[]>([
    {
      id: "",
      resource_id: { id: "", external_identifier: "" },
      author: { id: "", avatar_url: "", email: "", name: "Jo" },
      comment: "Test sdfgsdfgsdfg dfsgdfsgd sfgsdg dsfgdsf gdsfg dsfgsdg s",
      created_at: "",
      parent_id: null,
      level: 0,
      children: [],
      // children: [
      //   {
      //     author: { id: "", avatar_url: "", email: "", name: "Jo" },
      //     comment: "Test sdfgsdfgsdfg dfsgdfsgd sfgsdg dsfgdsf gdsfg dsfgsdg s",
      //     created_at: "",
      //     parent_id: null,
      //     level: 1,
      //     children: [],
      //   },
      // ],
    },
  ]);

  const handleCreateComment = () => {};

  const handleDeleteComment = () => {};

  const ctx: ThreadContextProps = {
    handleCreateComment,
    handleDeleteComment,
    comments,
  };

  return <ThreadContext value={ctx}>{children}</ThreadContext>;
};

export const Thread = () => {
  return (
    <ThreadContextProvider>
      <ThreadHeader />
      <ThreadBody />
      <LoginForm />
    </ThreadContextProvider>
  );
};
