import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Modal from "../Modal";
import { CloseModalButton, CreateModal } from "./styles";

const chat_backurl = "http://127.0.0.1:3095";

async function postRoom(
  title: string,
  max: number,
  password: string
): Promise<string> {
  return await fetch(`${chat_backurl}/api/room_list/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      max,
      password,
    }),
  }).then((res) => res.text());
}

export default function CreateRoomModal({
  onCloseModal,
  show,
}: {
  onCloseModal: any;
  show: any;
}) {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const { mutate: mutateRoom } = useMutation<unknown, unknown, any, unknown>(
    ({ title, max, password }) => postRoom(title, max, password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["roomlist"]);
      },
    }
  );

  const onSubmitFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateRoom({ title, max: 0, password });
    onCloseModal();
  };

  const onChangeTitle = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onChangePassword = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  if (!show) return null;
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        <fieldset>
          <legend>방 만들기</legend>
          <form onSubmit={onSubmitFunction}>
            <div>
              <input
                type="text"
                name="title"
                placeholder="방 제목"
                value={title}
                onChange={onChangeTitle}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호(없으면 공개방)"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <button type="submit">생성</button>
          </form>
        </fieldset>
      </div>
    </CreateModal>
  );
}
