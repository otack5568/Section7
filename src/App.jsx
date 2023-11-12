import React, { useEffect, useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/InconpleteTodos";
import { CompleteTodos } from "./components/ConpleteTodos";

import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [incompleteTodos, setIncompleteTodos] = useState([
    "ああああ",
    "いいい"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["うううう"]);

  const onchangeTodoText = (event) => setTodoText(event.target.value);

  /**追加
   *  */
  const onClickAdd = (event) => {
    if (todoText === "") return;
    //未完了リスト追加
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    //入力欄クリア
    setTodoText("");
  };

  /**
   * 削除
   * @param {*} index
   */
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); //index番目の要素から1個削除
    setIncompleteTodos(newTodos);
  };

  /**
   * 完了
   * @param {*} index
   */
  const onClickComplete = (index) => {
    const newInconpleteTodos = [...incompleteTodos];
    newInconpleteTodos.splice(index, 1); //index番目の要素から1個削除

    //未完了Todoのｉｎｄｅｘ番目を完了Todoリストの末尾にセットする
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newInconpleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  /**
   * 戻す
   * @param {*} index
   */
  const onClickBack = (index) => {
    const newConpleteTodos = [...completeTodos];
    newConpleteTodos.splice(index, 1); //index番目の要素から1個削除

    //未完了Todoのｉｎｄｅｘ番目を完了Todoリストの末尾にセットする
    const newInconpleteTodos = [...incompleteTodos, completeTodos[index]];

    //反映
    setCompleteTodos(newConpleteTodos);
    setIncompleteTodos(newInconpleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onchangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるToDoは5個までだよ～。消化しろ～。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClick={onClickBack} />
    </>
  );
};
